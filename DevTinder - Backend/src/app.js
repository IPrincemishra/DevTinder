const express = require("express")
const app = express();

const { adminAuth, userAuth } = require("./middlewares/auth")


//* Handle Auth Middleware for only GET request GET, POST
app.use("/admin", adminAuth)

app.post("/user/login", (req, res) => {
    res.send("User logged in successfully")
})

app.get("/user/data", userAuth, (req, res) => {
    res.send("User logged in successfully")
})

app.get("/admin/getAllData", (req, res) => {
    // * Logic of fetching data
    res.send("all Data sent")
})

app.get("/admin/deleteUser", (req, res) => {
    res.send("Deleted a user")
})

app.listen(3000, () => {
    console.log("server is successfully listening");
})