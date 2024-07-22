import express from "express";
import urlController from "../controllers/url.controller";

const router = express.Router();

router.post("/url", urlController.createUrl);
router.get("/url", urlController.getLongUrl);
router.get("/url/most-visited-urls", urlController.getMostVisitedUrls);
router.get("/:shortUrl", urlController.redirectToShortUrl);

export default router;
