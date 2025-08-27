const mongoose = require("mongoose")
const validator = require("validator")

const userSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true,
        minlength: 4,
        maxlength: 20
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

const User = mongoose.model("User", userSchema)

module.exports = User;