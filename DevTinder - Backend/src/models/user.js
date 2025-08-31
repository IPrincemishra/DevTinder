const mongoose = require("mongoose")
const validator = require("validator")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")


const userSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true,
        minlength: 4,
        maxlength: 20,
        index: true
    },
    lastName: {
        type: String,
        minlength: 4,
        maxlength: 30
    },
    emailId: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true,
        validate(value) {
            if (!validator.isEmail(value)) {
                throw new Error("Invalid Email : " + value)
            }
        }
    },
    password: {
        type: String,
        required: true,
        validate(value) {
            if (!validator.isStrongPassword(value)) {
                throw new Error("Your Password is Weak : " + value)
            }
        }
    },
    age: {
        type: String,
        min: 18
    },
    gender: {
        type: String,
        lowercase: true,
        validate(value) {
            if (!["male", "female", "others"].includes(value)) {
                throw new Error("Gender data is not valid !!")
            }
        }
    },
    photoUrl: {
        type: String,
        default: "https://plus.unsplash.com/premium_photo-1677094310956-7f88ae5f5c6b?q=80&w=580&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        validator(value) {
            if (!validator.isURL(value)) {
                throw new Error("Invalid Url : " + value)
            }
        }
    },
    about: {
        type: String,
        default: "This is default about of the user"
    },
    skills: {
        type: [String],
        default: ["JS", "NodeJS", "ReactJS"]
    }
}, {
    timestamps: true
})

userSchema.methods.getJWT = async function () {
    const user = this;

    const token = await jwt.sign({ _id: user._id }, "DRV@TInder$790", { expiresIn: "7d" })

    return token;
}


userSchema.methods.validatePassword = async function (passwordInputByUser) {
    const user = this;
    const passwordHash = user.password

    const isPasswordValid = await bcrypt.compare(passwordInputByUser, passwordHash)

    return isPasswordValid
}

const User = mongoose.model("User", userSchema)

module.exports = User;