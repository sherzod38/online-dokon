import Image from 'next/image';
import { supabase } from '@/lib/supabase';
import { AddToCartButton } from '@/components/AddToCartButton';
import { notFound } from 'next/navigation';

// Next.js 15 page props type
type PageProps = {
  params: { id: string };
  searchParams?: { [key: string]: string | string[] | undefined };
};

export default async function ProductPage(props: PageProps) {
  const { data: product } = await supabase
    .from('products')
    .select('*')
    .eq('id', props.params.id)
    .single();

  if (!product) {
    notFound();
  }

  return (
    <main className="container mx-auto py-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="relative h-96 w-full">
          <Image
            src={product.image_url}
            alt={product.name}
            fill
            className="object-cover rounded-lg"
          />
        </div>
        <div>
          <h1 className="text-3xl font-bold mb-4">{product.name}</h1>
          <p className="text-2xl font-bold mb-4">${product.price.toFixed(2)}</p>
          <p className="text-gray-600 mb-8">{product.description}</p>
          <AddToCartButton product={product} />
        </div>
      </div>
    </main>
  );
}
