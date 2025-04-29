import { supabase } from '@/lib/supabase';
import { ProductCard } from '@/components/ProductCard';
import { Product } from '@/types';

export default async function Home() {
  const { data: products, error } = await supabase
    .from('products')
    .select('*')
    .order('created_at', { ascending: false });

  if (error) {
    console.error('Error fetching products:', error);
  return (
      <main className="container mx-auto py-8">
        <h1 className="text-3xl font-bold mb-8">Mahsulotlar</h1>
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
          Mahsulotlarni yuklashda xatolik yuz berdi: {error.message}
        </div>
      </main>
    );
  }

  if (!products || products.length === 0) {
    return (
      <main className="container mx-auto py-8">
        <h1 className="text-3xl font-bold mb-8">Mahsulotlar</h1>
        <p className="text-gray-500">Mahsulotlar topilmadi. Iltimos, mahsulot qo&apos;shing.</p>
      </main>
    );
  }

  return (
    <main className="container mx-auto py-8">
      <h1 className="text-3xl font-bold mb-8">Mahsulotlar</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {products.map((product: Product) => (
          <ProductCard key={product.id} product={product} />
        ))}
    </div>
    </main>
  );
}
