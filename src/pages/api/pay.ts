import type { NextApiRequest, NextApiResponse } from "next";
import axios from "axios";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method Not Allowed" });
  }

  try {
    const { total, user, productDetails, phoneNumber } = req.body;

    const response = await axios.post(
      "https://api.flutterwave.com/v3/payments",
      {
        tx_ref: Date.now().toString(),
        amount: total,
        currency: "NGN",
        payment_options: "card,mobilemoney,ussd",
        customer: {
          email: user?.email,
          phone_number: phoneNumber,
          name: user?.name,
        },
        customizations: {
          title: "Graced Couture",
          description: "Payment for items in cart",
          logo: "https://cloud.appwrite.io/v1/storage/buckets/67dd3e480017830c181c/files/67dd3e6c0024fb43239a/view?project=67ceb0870003c5fa1db4&mode=admin",
        },
      },
      {
        headers: {
          Authorization: `Bearer ${process.env.FLW_SECRET_KEY}`,
          "Content-Type": "application/json",
        },
      }
    );

    res.status(200).json(response.data);
  } catch (error: any) {
    console.error("Flutterwave Error:", error.response?.data || error.message);
    res.status(500).json({ message: "Payment failed", error: error.response?.data });
  }
}
