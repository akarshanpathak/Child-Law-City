const express = require('express')
const router = express.Router()

const {
    login,
    signUp
} = require('../controllers/Auth')



router.post("/login", login)

router.post("/register", signUp)

module.exports = router