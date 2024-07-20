import express, { Request, Response } from "express";

const port = 3000;
const app = express();

app.get("/health", (_req: Request, res: Response) => {
  res.send("server is up");
});

app.listen(port, () => {
  console.log(`Server is up on port ${port}`);
});
