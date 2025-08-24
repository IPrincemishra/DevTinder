const mongoose = require("mongoose")

const connectDB = async () => {
    await mongoose.connect(
        "mongodb+srv://princemishra:0PDMMsDdqlPlWM3J@namastenodejs.9y5srxi.mongodb.net/devTinder"
    );
}

module.exports = connectDB;
