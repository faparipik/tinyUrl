import express, { Request, Response } from "express";
import { config } from "./config/config";
import connectDb from "./config/dbConfig";

const port = config.port;

const app = express();

connectDb();

app.get("/health", (_req: Request, res: Response) => {
  res.send("server is up");
});

app.listen(port, () => {
  console.log(`Server is up on port ${port}`);
});
