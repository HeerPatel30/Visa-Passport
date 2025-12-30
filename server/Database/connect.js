import mongoose from "mongoose";

const ConnectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("Database Connected...");
  } catch (error) {
    console.error("Database connection error:", error);
  }
};

export default ConnectDB;
