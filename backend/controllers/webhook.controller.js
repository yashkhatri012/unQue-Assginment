

import { extractLeadData } from "../services/meta.service.js";
import { databaseEntry } from "../services/lead.service.js";
import { getIO } from "../config/socket.js";


export const VerifyWebhook = (req, res) => {
  try {

    const hubMode = req.query["hub.mode"];
    const hubChallenge = req.query["hub.challenge"];
    const hubVerifyToken = req.query["hub.verify_token"];

    console.log("Webhook verification request received")

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
    console.log("========== WEBHOOK HIT ==========");
console.log("Request body:", JSON.stringify(req.body, null, 2));
    const payload = req.body;
    
    const leadgenId = payload?.entry?.[0]?.changes?.[0]?.value?.leadgen_id;
    
    if(!leadgenId) {
      res.status(400).send("Leadgen ID not found in the payload");
      return;
    }
    console.log('extraction started-------------')
    const data = await extractLeadData(leadgenId)

    console.log('extraction ended-------------')
    

    if (!data) {
      res.status(404).send("Lead data not found");
      return;
    }
    
    const newLead =  await databaseEntry(data);
    getIO().emit("new-lead", newLead);
    
    res.status(200).json({
      success: true,
      message: "Data fetched successfully",
      data: newLead
  });

  } catch (error) {
    console.error("Error receiving lead webhook:", error);
    res.status(500).send("Internal Server Error");
  }
};



