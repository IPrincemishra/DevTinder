const express = require("express")

const app = express();

app.use("/user", (req, res) => {
    res.send("hahahaha")
})

// * This will only handle get to /user
app.get("/user", (req, res) => {
    res.send(
        {
            firstName: "Prince",
            lastName: "Mishra"
        }
    )
})


app.post("/user", (req, res) => {
    //* Saving data to db
    res.send("Data successfully saved to the database")
})


app.delete("/user", (req, res) => {
    res.send("Deleted Successfully")
})



//! this will match all the HTTP method API calls to /test
app.use("/test", (req, res) => {
    res.send("hello from the server")
})


app.listen(3000, () => {
    console.log("server is successfully listening");

})