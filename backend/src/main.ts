import express, { Request, Response } from "express";
import cors from "cors";

import { config } from "./config/config";
import ErrorHandler from "./middlewares/error-handler.middleware";
import connectDb from "./config/dbConfig";
import urlRoutes from "./routes/url.route";

const port = config.port;

const app = express();

app.use(cors<Request>());

app.use(express.json());

connectDb();

app.get("/health", (_req: Request, res: Response) => {
  res.send("server is up");
});

app.use("/", urlRoutes);

app.use(ErrorHandler);

app.listen(port, () => {
  console.log(`Server is up on port ${port}`);
});
