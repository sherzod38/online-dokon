export type Product = {
  id: string;
  name: string;
  price: number;
  image_url: string;
  description: string;
};

export type CartItem = Product & {
  quantity: number;
};