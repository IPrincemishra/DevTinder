const express = require("express")
const connectDB = require("./config/database")
const app = express();
const User = require("./models/user")


app.post("/signup", async (req, res) => {
    // * Creating a new instance of the User model
    const user = new User({
        firstName: "Virat",
        lastName: "Kholi",
        emailId: "Virat@google.com",
        password: "virat$12345"
    });
    try {
        await user.save();
        res.send("User added Successfully")
    } catch (err) {
        res.status(400).send("Error saving the User : ", err.message)
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