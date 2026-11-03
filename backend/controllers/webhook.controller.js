

import { extractLeadData } from "../services/meta.service.js";

export const VerifyWebhook = (req, res) => {
  try {

    const hubMode = req.query["hub.mode"];
    const hubChallenge = req.query["hub.challenge"];
    const hubVerifyToken = req.query["hub.verify_token"];

    

    const verifyToken = process.env.WEBHOOK_VERIFY_TOKEN;

    

    if (hubMode === "subscribe" && hubVerifyToken === verifyToken) {
      res.status(200).send(hubChallenge);
    } else {
      res.status(403).send("Forbidden");
    }
  } catch (error) {
    console.error("Error verifying webhook:", error);
    res.status(500).send("Internal Server Error");
  }
};


export const receiveLeadWebhook = async (req, res) => {
  try {
    const payload = req.body;
    
    const leadgenId = payload?.entry?.[0]?.changes?.[0]?.value?.leadgen_id;
    

    const data = await extractLeadData(leadgenId)
    if (!data) {
      res.status(404).send("Lead data not found");
      return;
    }
    res.json(data);

  } catch (error) {
    console.error("Error receiving lead webhook:", error);
    res.status(500).send("Internal Server Error");
  }
};



