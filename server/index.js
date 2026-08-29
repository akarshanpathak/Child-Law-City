const express = require('express')
const app = express();
const cors = require('cors')
const cookieParser = require('cookie-parser')
const userRouter = require('./routes/User');

app.use(express.json());

const database = require('./config/database')
require('dotenv').config()

const PORT = process.env.PORT || 3000;

database.connect()



app.use(cookieParser());

app.use(
    cors({
        origin: 'http://localhost:5173',
        credentials: true
    })
)


app.use('/api/v1/user',userRouter)


//default route
app.get('/',(req,res)=>{
    return res.json({
        success:true,
        message:'Your server is up and running.....'
    })
})


app.listen(PORT,()=>{
    console.log(`App is running at ${PORT}`)
})