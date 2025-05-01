'use client';

import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';
import { ProductCard } from '@/components/ProductCard';
import { Product } from '@/types';

export default function HomePage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchProducts = async () => {
    try {
      const { data, error } = await supabase
        .from('products')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) {
        throw error;
      }

      setProducts(data || []);
    } catch (error) {
      console.error('Mahsulotlarni yuklashda xatolik:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    // Real-time subscription
    const channel = supabase
      .channel('products_channel')
      .on('postgres_changes', 
        { 
          event: '*', 
          schema: 'public', 
          table: 'products' 
        }, 
        () => {
          // Yangi ma'lumotlarni olish
          fetchProducts();
        }
      )
      .subscribe();

    // Dastlabki ma'lumotlarni yuklash
    fetchProducts();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  if (loading) {
    return (
      <main className="container mx-auto py-8 px-4">
        <div className="text-center">Yuklanmoqda...</div>
      </main>
    );
  }

  return (
    <main className="container mx-auto py-8 px-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </main>
  );
}
