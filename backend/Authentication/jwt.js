const jwt = require('jsonwebtoken')
require('dotenv').config();
const signupData = require("../Model/Signup")
const secret = process.env.JWT_token

//SetUser

const setUser = (user) => {
    return jwt.sign({

        _id: user._id,
        email: user.email

    }, secret)

}

// getUser

const getUser = async (req, res) => {
    try {
        const token = req.cookies.token
        console.log(token)

        if (!token) {
            return res.status(401).json({ message: "Unauthorised" })
        }
        const decoded = jwt.verify(token, secret)
        const user = await signupData.findById(decoded._id)

        if (!user) {
            console.log("user not login")
            return res.status(404).json({ message: 'User not found' });
        }
        console.log("user is login")
        return res.status(200).json({ user });
    }

    catch (error) {
        console.log("not reading", error)
    }

}
module.exports = { setUser, getUser }