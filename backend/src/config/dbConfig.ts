import mongoose from "mongoose";

import { config } from "./config";

const connectDb = async () => {
  try {
    await mongoose.connect(config.mongo.url, { dbName: config.mongo.db });
    console.log(`Database connected`);
  } catch (error) {
    console.log(JSON.stringify(error));
  }
};

export default connectDb;
