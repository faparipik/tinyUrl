import express from "express";
import urlController from "../controllers/url.controller";

const router = express.Router();

router.post("/url", urlController.createUrl);

export default router;
