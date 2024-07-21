import { Request, Response } from "express";
import { IUrl, IUrlParam } from "../types/url.types";
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

const redirectToShortUrl = async (req: Request<IUrlParam>, res: Response) => {
  const { shortUrl } = req.params;

  const urlFound = await urlModel.findOne({ shortUrl });
  if (urlFound) {
    await urlModel.updateOne({ shortUrl }, { clicks: urlFound.clicks + 1 });
    res.redirect(urlFound.fullUrl);
    return;
  }
  res.send("Couldn't find url");
};

export default {
  createUrl,
  redirectToShortUrl,
};
