const express = require("express")
const profileRouter = express.Router()
const { userAuth } = require("../middlewares/auth")
const { validateEditProfileData } = require("../utils/validation")
const bcrypt = require("bcrypt")
const validator = require("validator")
const { validate } = require("../models/user")

// * Profile View
profileRouter.get("/profile/view", userAuth, async (req, res) => {
    try {
        const user = req.user

        res.send(user)
    }
    catch (err) {
        res.status(404).send("ERROR : " + err.message)
    }
})

// * Profile Edit
profileRouter.patch("/profile/edit", userAuth, async (req, res) => {
    try {

        if (!validateEditProfileData(req)) {
            throw new Error("Invalid Edit Request")
        }

        const loggedInUser = req.user

        Object.keys(req.body).forEach(key => (loggedInUser[key] = req.body[key]))

        await loggedInUser.save()

        res.json({
            message: `${loggedInUser?.firstName}, your profile Edit was Successfully`,
            data: loggedInUser
        })
    } catch (err) {
        res.status(404).send("ERROR : " + err.message)
    }
})

// * Password Change
profileRouter.patch("/profile/password", userAuth, async (req, res) => {
    try {
        const { oldPassword, newPassword } = req.body

        if (!oldPassword || !newPassword) {
            return res.status(404).send("All fields are complusary")
        }

        // user
        const user = req.user

        const isMatch = await bcrypt.compare(oldPassword, user.password)
        if (!isMatch) {
            return res.status(404).send("Old password is wrong")
        }


        const isPasswordValid = validator.isStrongPassword(newPassword, {
            minLength: 8,
            minLowercase: 1,
            minUppercase: 1,
            minSymbols: 1,
            minNumbers: 1
        })

        if (!isPasswordValid) {
            return res.status(404).send("Password is Not strong enough")
        }


        // new password
        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(newPassword, salt)

        // save new password
        user.password = hashedPassword
        await user.save()

        res.cookie("token", null, {
            expires: new Date(Date.now()),
        })
        
        res.send("Password updated Successfully ")

    } catch (err) {
        res.status(404).send("All fields are complusary")
    }
})

module.exports = profileRouter