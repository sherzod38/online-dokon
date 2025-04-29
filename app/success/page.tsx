'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { supabase } from '@/lib/supabase';
import Link from 'next/link';
import { CheckCircle } from 'lucide-react';

type User = {
  id: string;
  email: string;
};

export default function SuccessPage() {
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkUser = async () => {
      try {
        const { data } = await supabase.auth.getUser();
        setUser(data.user as User | null);
        
        if (!data.user) {
          // Redirect to login if not authenticated
          router.push('/login');
        }
      } catch (error) {
        console.error('Error checking user:', error);
        router.push('/login');
      } finally {
        setLoading(false);
      }
    };
    
    checkUser();
  }, [router]);

  if (loading) {
    return (
      <main className="container mx-auto py-8">
        <div className="text-center">
          <p>Yuklanmoqda...</p>
        </div>
      </main>
    );
  }

  if (!user) {
    return null; // Will redirect in useEffect
  }

  return (
    <main className="container mx-auto py-8">
      <div className="max-w-md mx-auto">
        <Card>
          <CardHeader className="text-center">
            <div className="flex justify-center mb-4">
              <CheckCircle className="h-16 w-16 text-green-500" />
            </div>
            <CardTitle className="text-2xl">Buyurtma muvaffaqiyatli amalga oshirildi!</CardTitle>
          </CardHeader>
          <CardContent className="text-center">
            <p className="mb-4 text-lg">
              Tabriklaymiz! Sizning buyurtmangiz muvaffaqiyatli amalga oshirildi. Tez orada mahsulotlaringiz yetkazib beriladi!
            </p>
            <p className="text-gray-500">
              Buyurtma haqida batafsil ma&apos;lumot email orqali yuboriladi.
            </p>
          </CardContent>
          <CardFooter className="flex justify-center">
            <Button asChild>
              <Link href="/">Bosh sahifaga qaytish</Link>
            </Button>
          </CardFooter>
        </Card>
      </div>
    </main>
  );
} 