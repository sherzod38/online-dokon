import Image from 'next/image';
import Link from 'next/link';
import { Product } from '@/types';
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { AddToCartButton } from '@/components/AddToCartButton';

type ProductCardProps = {
  product: Product;
};

export function ProductCard({ product }: ProductCardProps) {
  // URL tekshiruvi
  const isValidUrl = (url: string) => {
    try {
      new URL(url);
      return true;
    } catch (e) {
      return false;
    }
  };

  // Agar URL noto'g'ri bo'lsa, default rasm ishlatamiz
  const imageUrl = isValidUrl(product.image_url) 
    ? product.image_url 
    : 'https://via.placeholder.com/800x600?text=No+Image';

  return (
    <Card className="overflow-hidden hover:shadow-lg transition-shadow h-full flex flex-col">
      <Link href={`/product/${product.id}`}>
        <div className="relative h-48 w-full">
          <Image
            src={imageUrl}
            alt={product.name}
            fill
            className="object-cover"
          />
        </div>
        <CardHeader>
          <CardTitle className="text-lg">{product.name}</CardTitle>
        </CardHeader>
        <CardContent className="flex-grow">
          <p className="text-xl font-bold mb-2">${product.price.toFixed(2)}</p>
          <p className="text-gray-600 line-clamp-2">{product.description}</p>
        </CardContent>
      </Link>
      <CardFooter>
        <AddToCartButton product={product} />
      </CardFooter>
    </Card>
  );
}
