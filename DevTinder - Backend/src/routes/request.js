const express = require("express")
const requestRouter = express.Router()
const { userAuth } = require("../middlewares/auth")

requestRouter.post("/sendConnectionRequest", userAuth, async (req, res) => {

    const user = req.user

    // Sending Connection Request
    console.log("Sending a Connection request");
    res.send(user.firstName + " sent the connection request")
})

module.exports = requestRouter