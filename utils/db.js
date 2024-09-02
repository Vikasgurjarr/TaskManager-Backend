
const mongoose = require("mongoose");

const URI = process.env.MONGODB_URI;

//const URI = "mongodb+srv://VikasGurjar:Taskyoudatabase@cluster0.fpraiwj.mongodb.net/taskyou?retryWrites=true&w=majority&appName=Cluster0";

const connectdb = async () => {
  try {
    await mongoose.connect(URI);
    console.log("Connection successful to Database");
  } catch (error) {
    console.error("Database Connection Failed", error);
    process.exit(0);
  }
};

module.exports = connectdb;
