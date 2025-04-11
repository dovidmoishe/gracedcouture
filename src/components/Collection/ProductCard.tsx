"use client";

import React from "react";
import Image, { StaticImageData } from "next/image";
import { cn } from "@/lib/utils";

import { motion } from "framer-motion";
import {
  Card,
  CardTitle,
  CardDescription,
  CardSkeletonContainer,
} from "../cards-demo-3";
import { productDetails } from "@/core/interfaces";
import { addToCart } from "@/core/actions";
import { toast } from "@/hooks/use-toast";
import Link from "next/link";
import {useRouter} from "next/router";

interface ProductCardProps extends productDetails {
  userId: string;
  customizable: boolean;
}

export const ProductCard: React.FC<ProductCardProps> = ({
  id,
  imageURL,
  name,
  price,
  description,
  userId,
  customizable
}) => {
  const router = useRouter()
  const onAddToCart = async () => {
    try {
      await addToCart(userId, id)
      toast({
        title: "Item added successfully"
      });
    } catch (error) {
      console.log(error)
    }

  };
  return (
    <Link href={`/product/${id}`}>
      <Card>
      <CardSkeletonContainer>
        <Image src={imageURL} alt={name} width={300} height={300} />
      </CardSkeletonContainer>
      <CardTitle>{name}</CardTitle>
      <CardDescription>
        <span className="font-bold text-xl">₦{price}</span>
        <br />
        {description}
      </CardDescription>
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={
          async () => {
            customizable ? router.push(`/product/${id}`) : await addToCart(userId, id, 1)
          }
        }
        className={cn(
          "bg-black text-white font-bold py-2 px-4 rounded mt-4 cursor-pointer",
          "hover:bg-gray-800"
        )}
      >
        Add to cart
      </motion.button>
    </Card>
    </Link>
  );
};
