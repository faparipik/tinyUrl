import dotenv from "dotenv";

dotenv.config();

const MONGO_URL = process.env.MONGO_URL || "";
const MONGO_DB = process.env.MONGO_DB || "";
const PORT = process.env.PORT ? Number(process.env.PORT) : 3000;
console.log(process.env);
export const config = {
  mongo: {
    url: MONGO_URL,
    db: MONGO_DB,
  },
  port: PORT,
};
