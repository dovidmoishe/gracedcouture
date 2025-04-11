"use client";

import React, { useState } from "react";
import {
  Modal,
  ModalTrigger,
  ModalBody,
  ModalContent,
  ModalFooter,
} from "@/components/ui/animated-modal";
import { User } from "@/core/useStore";
import { FlutterWaveButton, closePaymentModal } from "flutterwave-react-v3";
import { deleteAllItemsInCart } from "@/core/actions";
import { useRouter } from "next/router";
import { CartItem } from "@/pages/cart";
import axios from "axios";

interface UserDeliveryDataDTO {
  phoneNumber: string;
  streetAddress: string;
  city: string;
  state: string;
  zipCode: string;
}
interface PaymentDetails {
  total: number;
  user: User | null;
  productDetails: CartItem[];
}

const DeliveryForm = ({ user, total, productDetails }: PaymentDetails) => {
  const router = useRouter();
  const [formData, setFormData] = useState<UserDeliveryDataDTO>({
    phoneNumber: "",
    streetAddress: "",
    city: "",
    state: "",
    zipCode: "",
  });

  const config = {
    public_key: "FLWPUBK_TEST-2c8519179f5a3370a67f5d169f9a7ac0-X",
    tx_ref: Date.now().toString(),
    amount: total,
    currency: "NGN",
    payment_options: "card,mobilemoney,ussd",
    customer: {
      email: user?.email || "",
      phone_number: formData.phoneNumber as unknown as string,
      name: user?.name || "",
    },
    customizations: {
      title: "Graced Couture",
      description: "Payment for items in cart",
      logo: "https://cloud.appwrite.io/v1/storage/buckets/67dd3e480017830c181c/files/67dd3e6c0024fb43239a/view?project=67ceb0870003c5fa1db4&mode=admin",
    },
  };


  const fwConfig = {
    ...config,
    text: "Pay with Flutterwave!",
    callback: async (response: any) => {
      try {
        console.log("Flutterwave Response:", response);
        
        if (response.status === "completed") {
          // Disable default error logging
          console.error = () => {};
  
          await Promise.all([
            deleteAllItemsInCart(user?.id as unknown as string),
            axios.post("/api/telegram", {
              amount: total,
              customer: {
                email: user?.email,
                name: user?.name,
                phoneNumber: formData.phoneNumber as unknown as string,
                deliveryDetails: JSON.stringify(formData) 
              },
              productDetails: productDetails,
            })
          ]);
  
          router.push('/thank-you');
        } else {
          console.error("Payment was not successful");
        }
      } catch (error) {
        console.error("Payment processing error:", error);
      } finally {
        // Always close the payment modal, even if there's an error
        closePaymentModal();
      }
    },
    onClose: () => {
      // Optional: handle modal close event
    },
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("User Delivery Data:", formData);
  };

  return (
    <>
      <ModalTrigger className="bg-blue-500 text-white px-4 py-2 rounded-md">
        Continue to Payment
      </ModalTrigger>
      <ModalBody>
        <ModalContent className="bg-gray-900 text-white p-6 rounded-lg shadow-lg">
          <h2 className="text-xl font-bold mb-4">Delivery Information</h2>
          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <input
              type="number"
              name="phoneNumber"
              placeholder="Phone Number"
              value={formData.phoneNumber}
              onChange={handleChange}
              className="p-2 bg-gray-800 text-white border border-gray-700 rounded"
              required
            />
            <input
              type="text"
              name="streetAddress"
              placeholder="Street Address"
              value={formData.streetAddress}
              onChange={handleChange}
              className="p-2 bg-gray-800 text-white border border-gray-700 rounded"
              required
            />
            <input
              type="text"
              name="city"
              placeholder="City"
              value={formData.city}
              onChange={handleChange}
              className="p-2 bg-gray-800 text-white border border-gray-700 rounded"
              required
            />
            <input
              type="text"
              name="state"
              placeholder="State"
              value={formData.state}
              onChange={handleChange}
              className="p-2 bg-gray-800 text-white border border-gray-700 rounded"
              required
            />
            <input
              type="text"
              name="zipCode"
              placeholder="ZIP Code"
              value={formData.zipCode}
              onChange={handleChange}
              className="p-2 bg-gray-800 text-white border border-gray-700 rounded"
              required
            />
            <ModalFooter>
              <button
                type="submit"
                className="bg-green-500 text-white px-4 py-2 rounded-md"
              >
                <FlutterWaveButton {...fwConfig} />
              </button>
            </ModalFooter>
          </form>
        </ModalContent>
      </ModalBody>
    </>
  );
};

export default DeliveryForm;
