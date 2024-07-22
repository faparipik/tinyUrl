import express from "express";
import urlController from "../controllers/url.controller";
import { validateRequest } from "../middlewares/validation.middleware";
import { ShortUrlQuery, ShortUrlParam, UrlBody } from "../types/url.types";

const router = express.Router();

router.post(
  "/url",
  validateRequest({ body: UrlBody }),
  urlController.createUrl
);
router.get(
  "/url",
  validateRequest({ query: ShortUrlQuery }),
  urlController.getLongUrl
);
router.get("/url/most-visited-urls", urlController.getMostVisitedUrls);

router.get(
  "/:shortUrl",
  validateRequest({ params: ShortUrlParam }),
  urlController.redirectToShortUrl
);

export default router;
