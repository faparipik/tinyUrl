import { Request, Response } from "express";
import { IMostVisitedUrlResponse, IUrl, IUrlParam } from "../types/url.types";
import urlModel from "../models/url.model";
import urlAuditLogModel from "../models/url-audit-log.model";

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
    const response = await urlModel.findOneAndUpdate(
      { shortUrl },
      { clicks: urlFound.clicks + 1 }
    );

    await urlAuditLogModel.create({ url: response });
    res.redirect(urlFound.fullUrl);
    return;
  }

  res.send("Couldn't find url");
};

const getLongUrl = async (
  req: Request<{}, IUrl | null, {}, IUrlParam>,
  res: Response<IUrl | null>
) => {
  const { shortUrl } = req.query;

  const formatedShortUrl = shortUrl.split("/").pop();

  const urlFound = await urlModel.findOne({ shortUrl: formatedShortUrl });

  res.send(urlFound);
};

const getMostVisitedUrls = async (
  _req: Request<{}, IMostVisitedUrlResponse[]>,
  res: Response<IMostVisitedUrlResponse[]>
) => {
  const response = await urlAuditLogModel.aggregate([
    {
      $match: {
        $expr: {
          $gte: [
            "$createdAt",
            {
              $dateSubtract: {
                startDate: "$$NOW",
                unit: "hour",
                amount: 24,
              },
            },
          ],
        },
      },
    },
    {
      $lookup: {
        from: "urls",
        localField: "url",
        foreignField: "_id",
        as: "urls",
      },
    },
    {
      $group: {
        _id: "$url",
        clicksIn24Hours: { $sum: 1 },
        detail: { $first: "$$ROOT" },
      },
    },
    {
      $replaceRoot: {
        newRoot: {
          $mergeObjects: [
            { clicksIn24Hours: "$clicksIn24Hours" },
            { $first: "$detail.urls" },
          ],
        },
      },
    },
    {
      $sort: {
        clicksIn24Hours: -1,
      },
    },
  ]);

  res.send(response);
};

export default {
  createUrl,
  redirectToShortUrl,
  getLongUrl,
  getMostVisitedUrls,
};
