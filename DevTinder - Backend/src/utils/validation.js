const validator = require("validator")

const validateSignUpData = (req) => {
    const { firstName, lastName, emailId, password, skills } = req.body

    if (!firstName || !lastName) {
        throw new Error("Name is not valid")
    }
    else if (firstName.length < 4 || firstName.length > 40) {
        throw new Error("First name should be in 4 - 40 words")
    }
    else if (!validator.isEmail(emailId)) {
        throw new Error("Email Invalid")
    }
    else if (!validator.isStrongPassword(password)) {
        throw new Error("Password is to Weak")
    } else if (skills.length > 5) {
        throw new Error("Skills more than 5 not allowed")
    }
}

module.exports = {
    validateSignUpData
}