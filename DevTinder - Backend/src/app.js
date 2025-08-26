const express = require("express")
const connectDB = require("./config/database")
const app = express();
const User = require("./models/user")

app.use(express.json())

app.post("/signup", async (req, res) => {
    // console.log(req.body);

    // * Creating a new instance of the User model
    const user = new User(req.body);
    try {
        await user.save();
        res.send("User added Successfully")
    } catch (err) {
        res.status(400).send("Error saving the User : ", err.message)
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
    // console.log(User.name);

    try {
        const users = await User.find({})
        res.send(users)
    } catch (err) {
        res.status(404).send("Something went wrong")
    }

})

// To delete an user but id
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

app.patch("/user", async (req, res) => {
    const userId = req.body.userId
    const data = req.body
    try {
        const user = await User.findByIdAndUpdate({ _id: userId }, data)
        console.log(user);
        res.send("User Updated Successfully")
    } catch (err) {
        res.status(404).send("Somthing went wrong")
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