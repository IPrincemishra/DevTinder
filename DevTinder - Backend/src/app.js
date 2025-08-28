const express = require("express")
const { validateSignUpData } = require("./utils/validation")
const connectDB = require("./config/database")
const app = express();
const User = require("./models/user")
const bcrypt = require("bcrypt");
const cookieParser = require("cookie-parser");
const jwt = require("jsonwebtoken")
const { userAuth } = require("./middlewares/auth")
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
        const isPasswordValid = await user.validatePassword(password)

        if (isPasswordValid) {

            // Create a JWT Token
            const token = await user.getJWT()

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
app.get("/profile", userAuth, async (req, res) => {
    try {
        const user = req.user

        res.send(user)
    }
    catch (err) {
        res.status(404).send("ERROR : " + err.message)
    }
})

app.post("/sendConnectionRequest", userAuth, async (req, res) => {

    const user = req.user

    // Sending Connection Request
    console.log("Sending a Connection request");
    res.send(user.firstName + " sent the connection request")
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