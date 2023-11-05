import mongoose from "mongoose";

const connectMongoDB = async () => {
  try {
    mongoose.connect(process.env.DB_URL);
    console.log("connection to mongodb established");
  } catch (error) {
    console.log(error);
  }
};

export default connectMongoDB;
