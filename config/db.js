// ======================================
const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    const DB = process.env.MONGO_URI;
    await mongoose.connect(DB, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("Connected to MongoDB : " + process.env.MONGO_URI);
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
    process.exit(1);
  }
};

module.exports = connectDB;
