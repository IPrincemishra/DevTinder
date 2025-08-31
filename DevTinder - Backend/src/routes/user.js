const express = require("express")
const userRouter = express.Router()

const { userAuth } = require("../middlewares/auth")
const ConnectionRequest = require("../models/connectionRequest")

const USER_SAFE_DATA = ["firstName", "lastName", "about", "age", "gender", "photoUrl", "skills"]

// * Get all the pending connection request for the loggedIn User
userRouter.get("/user/requests", userAuth, async (req, res) => {
    try {

        const loggedInUser = req.user

        const connectionRequests = await ConnectionRequest.find({
            toUserId: loggedInUser._id,
            status: "interested"
        }).populate("fromUserId", USER_SAFE_DATA)

        res.json({
            message: "Data fetched sucessfully",
            data: connectionRequests
        })
    } catch (err) {
        res.status(400).json({
            message: "ERROR : " + err.message
        })
    }
})

// * 
userRouter.get("/user/connections", userAuth, async (req, res) => {
    try {
        const loggedInUser = req.user

        const connectionRequests = await ConnectionRequest.find({
            $or: [
                { toUserId: loggedInUser._id, status: "accepted" },
                { fromUserId: loggedInUser._id, status: "accepted" },
            ]
        }).populate("fromUserId", USER_SAFE_DATA).populate("toUserId", USER_SAFE_DATA);

        const data = connectionRequests.map(row => {

            if (row.fromUserId._id.toString() === loggedInUser._id.toString()) {
                return row.toUserId;
            }
            return row.fromUserId
        })

        res.json({
            message: "Your Connections",
            data
        })

    } catch (err) {
        res.status(400).json({ "ERROR : ": err.message })
    }
})

module.exports = userRouter