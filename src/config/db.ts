import mongoose from "mongoose";
import colors from "colors";

export const connectDB = async () => {
  try {
    const connection = await mongoose.connect(process.env.DATABASE_URL);
    const url = `${connection.connection.host}:${connection.connection.port}`;
    console.log(colors.bgYellow.bold.white(`Mongo DB connected on ${url}`));
  } catch (error) {
    console.log(colors.bgRed.white("Error connecting to MongoDB"));
    process.exit(1);
  }
};
