


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
