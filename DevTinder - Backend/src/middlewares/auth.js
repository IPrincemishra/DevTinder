const jwt = require("jsonwebtoken")
const User = require("../models/user")

const userAuth = async (req, res, next) => {
    // ! Read the token from the req cookies
    try {
        const { token } = req.cookies
        if (!token) {
            throw new Error("Token is not valid")
        }
        // validate the token
        const decodedObj = await jwt.verify(token, "DRV@TInder$790")
        // find the user
        const { _id } = decodedObj
        const user =await User.findById(_id)

        if (!user) {
            throw new Error("User Not found")
        }
        
        req.user = user

        next()
    } catch (err) {
        res.status(400).send("ERROR : " + err.message)
    }
}



module.exports = {
    userAuth
}