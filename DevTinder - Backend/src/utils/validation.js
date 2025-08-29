const validator = require("validator");

const validateSignUpData = (req) => {
    const { firstName, lastName, emailId, password, skills } = req.body;

    if (!firstName || !lastName) {
        throw new Error("Name is not valid");
    }
    if (firstName.length < 4 || firstName.length > 40) {
        throw new Error("First name should be between 4 to 40 characters");
    }
    if (!validator.isEmail(emailId)) {
        throw new Error("Email Invalid");
    }
    if (!validator.isStrongPassword(password)) {
        throw new Error("Password is too weak");
    }
    if (skills && skills.length > 5) {
        throw new Error("Skills more than 5 not allowed");
    }
};

const validateEditProfileData = (req) => {
    const allowedEditFields = [
        "firstName",
        "lastName",
        "photoUrl",
        "gender",
        "age",
        "about",
        "skills"
    ];

    const isEditAllowed = Object.keys(req.body).every(field => allowedEditFields.includes(field))

    return isEditAllowed
}


module.exports = {
    validateSignUpData,
    validateEditProfileData
};
