const express = require("express")
const app = express();


app.use("/", (err, req, res, next) => {
    if (err) {
        res.status(501).send("Something went wrong")
    }
})

app.get("/getUserData", (req, res) => {
    // try {
    //* Logic of DB call and get user data
    throw new Error("jksdh")
    res.send("User logged in successfully")
    // }
    // catch (err) {
    //     res.status(500).send("Some Error contact support team")
    // }
})

app.use("/", (err, req, res, next) => {
    if (err) {
        res.status(500).send("Something went wrong")
    }
})

app.listen(3000, () => {
    console.log("server is successfully listening");
})