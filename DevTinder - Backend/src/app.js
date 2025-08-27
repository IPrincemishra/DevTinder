const express = require("express")
const { validateSignUpData } = require("./utils/validation")
const connectDB = require("./config/database")
const app = express();
const User = require("./models/user")
const bcrypt = require("bcrypt");
const cookieParser = require("cookie-parser");
const jwt = require("jsonwebtoken")

app.use(express.json())
app.use(cookieParser())

// * Creating a new user account record

app.post("/signup", async (req, res) => {

    try {

        //! Validation of data
        validateSignUpData(req)

        const { firstName, lastName, emailId, password, gender } = req.body

        //* Encrypt the password
        const passwordHash = await bcrypt.hash(password, 10)

        // * Creating a new instance of the User model
        const user = new User({
            firstName,
            lastName,
            emailId,
            password: passwordHash,
            gender
        });

        await user.save();
        res.send("User added Successfully")
    } catch (err) {
        res.status(400).send("Error : " + err.message)
    }
})

// * Login of Existing user
app.post("/login", async (req, res) => {

    try {
        const { emailId, password } = req.body;

        const user = await User.findOne({ emailId: emailId })
        if (!user) {
            throw new Error("Invalid credentials")
        }
        const isPasswordValid = await bcrypt.compare(password, user.password)

        if (isPasswordValid) {

            // Create a JWT Token
            const token = await jwt.sign({ _id: user._id }, "DRV@TInder$790")

            // Add the token to cookie and send the response back to user
            res.cookie("token", token)

            res.send("login Sucessfully")
        } else {
            throw new Error("Invalid credentials")
        }

    } catch (err) {
        res.status(404).send("ERROR : " + err.message)
    }
})

// * Profile
app.get("/profile", async (req, res) => {
    try {
        const cookies = req.cookies

        const { token } = cookies
        if (!token) {
            throw new Error("Invalid Token")
        }

        //* Validate my token
        const decodedMsg = await jwt.verify(token, "DRV@TInder$790")

        const { _id } = decodedMsg

        const user = await User.findById(_id)
        if (!user) {
            throw new Error("User does not Exist") 
        }
        res.send(user)
    }
    catch (err) {
        res.status(404).send("ERROR : " + err.message)
    }
})

//* Get user by email
app.get("/user", async (req, res) => {
    const userEmail = req.body.emailId

    try {
        const user = await User.findOne({ emailId: userEmail })
        if (!user) {
            res.status(404).send("user not found")
        } else {
            res.send(user)
        }
        // const users = await User.find({
        //     emailId: userEmail
        // })

        // if (users.length === 0) {
        //     res.status(404).send("user not found")
        // } else {
        //     res.send(users)
        // }
    } catch (err) {
        res.status(400).send("Somthing went wrong")
    }
})

//! feed API - To get all the users from the database 
app.get("/feed", async (req, res) => {

    try {
        const users = await User.find({})
        res.send(users)
    } catch (err) {
        res.status(404).send("Something went wrong")
    }

})

// To delete an user by id
app.delete("/user/:id", async (req, res) => {
    const userId = req.params.id;

    try {
        const user = await User.findByIdAndDelete(userId);
        if (!user) {
            return res.status(404).send("User not found");
        }
        res.send("User Deleted Successfully");
    } catch (err) {
        res.status(500).send("Something went wrong");
    }
});

// to update an data record
app.patch("/user/:userId", async (req, res) => {
    const userId = req.params.userId
    const data = req.body

    try {

        const ALLOWED_UPDATES = [
            "photoURL",
            "about",
            "gender",
            "skills",
            "firstName",
            "lastName",
            "age"
        ];

        const isUpdateAllowed = Object.keys(data).every((k) => ALLOWED_UPDATES.includes(k))



        if (!isUpdateAllowed) {
            throw new Error("Update Not Allowed")
        }

        if (data.skills && data.skills.length > 5) {
            throw new Error("Skills more than 5 not allowed");
        }

        const user = await User.findByIdAndUpdate({ _id: userId }, data, {
            runValidators: true
        })

        res.send("User Updated Successfully")
    } catch (err) {
        res.status(404).send("Update fail : " + err.message)
    }
})

connectDB()
    .then(() => {
        console.log("Database connection established");
        app.listen(3000, () => {
            console.log("server is successfully listening");
        })
    })
    .catch(err => {
        console.error("Database cannot be connected");
    })