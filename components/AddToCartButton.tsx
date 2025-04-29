"use client";

import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { useCart } from "@/context/CartContext";
import { Product } from "@/types";

type AddToCartButtonProps = {
  product: Product;
};

export function AddToCartButton({ product }: AddToCartButtonProps) {
  const { addToCart } = useCart();
  const [added, setAdded] = useState(false);

  const handleClick = () => {
    addToCart(product);
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  return (
    <Button
      onClick={handleClick}
      className="w-full"
      variant={added ? "secondary" : "default"}
    >
      {added ? "Savatga qo&apos;shildi" : "Savatga qo&apos;shish"}
    </Button>
  );
}