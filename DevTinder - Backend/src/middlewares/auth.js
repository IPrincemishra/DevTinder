const adminAuth = (req, res, next) => {
    // ! Logic of Checking if the request is authorized

    const token = "xyz";

    const isAdminAuthorized = token === "xy"

    if (!isAdminAuthorized) {
        res.status(401).send("Unauthorized request")
    } else {
        next()
    }
}


const userAuth = (req, res, next) => {
    // ! Logic of Checking if the request is authorized

    const token = "xyz";

    const isAdminAuthorized = token === "xyz"

    if (!isAdminAuthorized) {
        res.status(401).send("Unauthorized request")
    } else {
        next()
    }
}



module.exports = {
    adminAuth,
    userAuth
}