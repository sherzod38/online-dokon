"use client";

import { Button } from "@/components/ui/button";
import { useCart } from "@/context/CartContext";
import { Product } from "@/types";

type AddToCartButtonProps = {
  product: Product;
};

export function AddToCartButton({ product }: AddToCartButtonProps) {
  const { addToCart } = useCart();

  return (
    <Button 
      onClick={() => addToCart(product)}
      className="w-full"
    >
      Savatga qo'shish
    </Button>
  );
}