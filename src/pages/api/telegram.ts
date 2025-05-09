import type { NextApiRequest, NextApiResponse } from "next";
import axios from "axios";
const botToken = process.env.BOT_TOKEN as string;
const adminChatId = process.env.CHAT_ID as string; // Set this in .env

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {

  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method Not Allowed" });
  }

  try {
    const { amount, customer, productDetails } = req.body; // Data from payment gateway
    const TELEGRAM_API = `https://api.telegram.org/bot${botToken}/sendMessage`;

    type Product = {
      name: string;
      quantity: number;
      price: number;
      customName?: string;
    };

    const refinedProducts = (productDetails as Product[]).map((product) => ({
      Name: product.name,
      Quantity: product.quantity,
      Price: `NGN ${product.price}`,
      Customization: product.customName ? `Customized for: ${product.customName}` : 'No custom details'
    }));
    
    const deliveryDetails = JSON.parse(customer.deliveryDetails);
    
    const message = `
    ✅ New Order Received! 
    
    🛍️ Product Details:
    ${refinedProducts.map((product) => 
      `• ${product.Name}
        Quantity: ${product.Quantity}
        Price: ${product.Price}
        ${product.Customization}`
    ).join('\n')}
    
    💰 Total Amount: NGN ${amount}
    
    👤 Customer Information:
    - Name: ${customer.name}
    - Email: ${customer.email}
    - Phone: ${customer.phoneNumber}
    
    📦 Delivery Address:
    - Street: ${deliveryDetails.streetAddress}
    - City: ${deliveryDetails.city}
    - State: ${deliveryDetails.state}
    - ZIP Code: ${deliveryDetails.zipCode}
    `;

    await axios.post(TELEGRAM_API, {
      chat_id: adminChatId,
      text: message,
    });
    return res.status(200).json({ message: "Notification sent!" });
  } catch (error) {
    console.error("Error sending Telegram message:", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
}
