const express = require("express")
const userRouter = express.Router()

const { userAuth } = require("../middlewares/auth")
const ConnectionRequest = require("../models/connectionRequest")
const User = require("../models/user")

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

// * Get all the friend connection for the loggedIn User
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

// * get feed of all devTinder Users
userRouter.get("/feed", userAuth, async (req, res) => {
    try {

        const loggedInUser = req.user

        const page = parseInt(req.query.page) || 1;
        let limit = parseInt(req.query.limit) || 10
        limit = limit > 50 ? 50 : limit

        const skip = (page - 1) * limit

        const connectionRequest = await ConnectionRequest.find({
            $or: [
                { fromUserId: loggedInUser._id },
                { toUserId: loggedInUser._id }
            ]
        }).select("fromUserId toUserId")

        const hideUserFromFeed = new Set()
        connectionRequest.forEach(req => {
            hideUserFromFeed.add(req.fromUserId.toString());
            hideUserFromFeed.add(req.toUserId.toString())
        });

        const users = await User.find(
            {
                $and: [
                    { _id: { $nin: Array.from(hideUserFromFeed) } },
                    { _id: { $ne: loggedInUser._id } }
                ]
            }
        ).select(USER_SAFE_DATA).skip(skip).limit(limit)

        res.send(users)
    } catch (err) {
        res.status(404).json({
            message: "ERROR : " + err.message
        })
    }
})

module.exports = userRouter