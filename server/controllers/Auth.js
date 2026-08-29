const User = require('../models/User')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

require('dotenv').config()

exports.signUp = async (req, res) => {
    console.log(req.body)
    try {
        const {
            name,
            email,
            password,
            gender,
            dateOfBirth,
        } = req.body;

        if (!name || !email || !password || !gender || !dateOfBirth) {
            return res.status(400).json({
                success: false,
                message: 'All fields are required'
            })
        }

        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({
                success: false,
                message: 'User already registered'
            });
        }
        const hashedPass = await bcrypt.hash(password, 10)

        const user = await User.create({
            name,
            email,
            password: hashedPass,
            dateOfBirth,
            gender,
            image: `https://api.dicebear.com/5.x/initials/svg?seed=${name}`,
        })
        //return res
        return res.status(201).json({
            success: true,
            message: 'User registered successfully',
            user,
        });

    } catch (error) {
        console.error(error)
        return res.status(500).json({
            success: false,
            message: error
        })
    }
}


exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({
                success: false,
                message: 'Fill all the details'
            })
        }

        const user = await User.findOne({ email: email })
        if (!user) {
            return res.status(401).json({
                success: false,
                message: 'User is not registered,Please signUp first',
            })
        }

        if(await bcrypt.compare(password,user.password)){
            const payload = {
                email: user.email,
                id: user._id,
                role: user.role,
            }
            const token = jwt.sign(payload,process.env.JWT_SECRET,{
                expiresIn: '24h',
            });
            user.password = undefined;
            //cookie
            const options = {
                expires: new Date(Date.now() + 7*24*60*60*1000),
                httpOnly: true,
                secure: process.env.NODE_ENV === 'production',
                sameSite: 'lax',
            }
            return res.cookie('token',token,options).status(200).json({
                success: true,
                token,
                user,
                message: 'Logged in Successfully'
            })
        }else{
            return res.status(401).json({
            success:false,
            message:'Password is incorrect',
        });
        }
    } catch (error) {
        console.log(error);
         return res.status(500).json({
            success:false,
            message:'Login failed, Please try again',
        });
    }
}