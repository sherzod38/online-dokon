'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { supabase } from '@/lib/supabase';
import { Card, CardContent } from '@/components/ui/card';

export default function SuccessPage() {
  const router = useRouter();

  useEffect(() => {
    const checkUser = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      
      if (!session) {
        router.push('/success');
      }
    };
    
    checkUser();
  }, [router]);

  return (
    <main className="container mx-auto py-8">
      <Card className="max-w-2xl mx-auto">
        <CardContent className="p-8 text-center">
          <h1 className="text-3xl font-bold text-green-600 mb-4">✨ Tabriklaymiz! ✨</h1>
          <p className="text-xl">
            Sizning buyurtmangiz muvaffaqiyatli amalga oshirildi. Tez orada mahsulotlaringiz yetkazib beriladi!
          </p>
        </CardContent>
      </Card>
    </main>
  );
}