import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method Not Allowed" });
  }

  try {
    const secretHash = process.env.FLUTTERWAVE_SECRET_HASH;
    const signature = req.headers["verif-hash"]; // Flutterwave sends this

    if (!signature || signature !== secretHash) {
      return res.status(401).json({ message: "Unauthorized webhook request" });
    }

    const payload = req.body;
    console.log("Flutterwave Webhook Data:", payload);

    // 🔹 Check if transaction was successful
    if (payload.status === "successful") {
      // Process the successful payment (e.g., update database, send email, etc.)
      console.log("✅ Payment Successful:", payload);
    } else {
      console.log("❌ Payment Failed:", payload);
    }

    return res.status(200).json({ message: "Webhook received" });
  } catch (error) {
    console.error("Error processing webhook:", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
}
