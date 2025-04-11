"use client";
import { addToCart, getProduct } from "@/core/actions";
import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Image from "next/image";
import { appwriteConstants } from "@/lib/appwrite";
import { toast } from "@/hooks/use-toast";
import useUserState from "@/core/useStore";

interface Product {
  id: string;
  name: string;
  price: number;
  description: string;
  imageURL: string;
  customizable: boolean;
}

const ProductPage = () => {
  const [product, setProduct] = useState<Product | null>(null);
  const [customName, setCustomName] = useState<string>(""); // New state for custom name
  const params = useParams();
  const productId = params?.productId as string;
  const user = useUserState((state) => state.user);

  useEffect(() => {
    if (!productId) return;
    const fetchProduct = async () => {
      const response = await getProduct(productId);
      setProduct({
        id: response.$id,
        name: response.name,
        price: response.price,
        description: response.description,
        imageURL: `https://cloud.appwrite.io/v1/storage/buckets/${appwriteConstants.image_bucket}/files/${response.productImage}/preview?project=67ceb0870003c5fa1db4`,
        customizable: response.customizable,
      });
    };
    fetchProduct();
  }, [productId]);

  if (!product)
    return (
      <p className="text-center py-10 text-gray-400">Loading product...</p>
    );

  const onAddToCart = async () => {
    try {
      await addToCart(user?.id as unknown as string, product?.id, 1, customName);
      toast({
        title: "Item added successfully",
      });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="max-w-6xl mx-auto p-6 text-white min-h-screen">
      {/* Product Details */}
      <div className="grid md:grid-cols-2 gap-8 items-start">
        {/* Product Image */}
        <div className="w-full">
          <Image
            src={product.imageURL}
            alt={product.name}
            width={600}
            height={600}
            className="w-full h-auto rounded-lg shadow-lg border border-gray-700"
          />
        </div>

        <div>
          <h1 className="text-4xl font-bold text-white">{product.name}</h1>
          <p className="text-3xl font-semibold text-white mt-6">
            ₦{product.price.toLocaleString()}
          </p>

          {/* Customization Input */}
          {product.customizable && (
            <div className="mt-4">
              <label className="text-gray-300 block mb-2">
                Personalize your product with your name:
              </label>
              <input
                type="text"
                value={customName}
                onChange={(e) => setCustomName(e.target.value)}
                placeholder="Enter your name"
                className="w-full px-4 py-2 text-white rounded-md border border-gray-700 focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>
          )}

          <div className="mt-3 flex gap-4">
            <button
              onClick={onAddToCart}
              className="px-6 py-3 text-lg font-medium bg-white text-black rounded-md shadow-md hover:bg-primary/80 hover:text-white cursor-pointer"
            >
              Add to Cart
            </button>
          </div>

          <p className="mt-4 text-gray-300 leading-relaxed">
            {product?.description}
          </p>
        </div>
      </div>
    </div>
  );
};

export default ProductPage;
