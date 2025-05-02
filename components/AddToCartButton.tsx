"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from "@/components/ui/button";
import { useCart } from "@/context/CartContext";
import { Product } from "@/types";

type AddToCartButtonProps = {
  product: Product;
};

export function AddToCartButton({ product }: AddToCartButtonProps) {
  const router = useRouter();
  const { addToCart } = useCart();
  const [added, setAdded] = useState(false);

  const handleClick = () => {
    addToCart(product);
    setAdded(true);
    setTimeout(() => {
      setAdded(false);
    }, 1500);
  };

  return (
    <Button
      onClick={handleClick}
      className={`w-full cursor-pointer transition-all duration-300 ${
        added 
          ? "bg-red-500" 
          : "hover:bg-green-500 hover:text-white"
      }`}
      variant={added ? "secondary" : "default"}
    >
      {added ? "Savatga qo'shildi" : "Savatga qo'shish"}
    </Button>
  );
}