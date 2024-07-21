import { Request, Response } from "express";
import { IUrl } from "../types/url.types";
import urlModel from "../models/url.model";

const createUrl = async (
  req: Request<{}, IUrl, Omit<IUrl, "shortUrl" | "clicks">>,
  res: Response<IUrl>
) => {
  const { fullUrl } = req.body;

  const urlFound = await urlModel.findOne({ fullUrl });

  if (urlFound) {
    res.send(urlFound);
    return;
  }

  const createdUrl = await urlModel.create({ fullUrl });

  res.send(createdUrl);
};

export default {
  createUrl,
};
