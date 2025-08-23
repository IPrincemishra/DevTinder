const express = require("express")

const app = express();

app.use("/user", (req, res, next) => {
    console.log("Handling the route user");
    next();
},
    (req, res, next) => {
        console.log("Handling the route user 2!!");
        // res.send("2nd response !!")
        next()
    },
    (req, res, next) => {
        console.log("Handling the route user 3!!");
        // res.send("3rd response !!")
        next()
    },
    (req, res, next) => {
        console.log("Handling the route user 4!!");
        // res.send("4th response !!")
        next()
    },
    (req, res, next) => {
        console.log("Handling the route user 5!!");
        res.send("5th response !!")
        // next()
    },
)


app.listen(3000, () => {
    console.log("server is successfully listening");
})