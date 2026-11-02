import express from "express";

import { VerifyWebhook } from "../controllers/webhook.controller.js";

const router = express.Router();

router.get("/webhook", VerifyWebhook);

export default router;

