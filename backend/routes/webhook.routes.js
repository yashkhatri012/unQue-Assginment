import express from "express";

import { VerifyWebhook , receiveLeadWebhook } from "../controllers/webhook.controller.js";

const router = express.Router();

router.get("/webhook", VerifyWebhook);
router.post("/webhook", receiveLeadWebhook);


export default router;

