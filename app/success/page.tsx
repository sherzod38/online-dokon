'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { supabase } from '@/lib/supabase';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export default function SuccessPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [userEmail, setUserEmail] = useState<string | null>(null);

  useEffect(() => {
    const checkUser = async () => {
      try {
        const { data: { user } } = await supabase.auth.getUser();
        if (!user) {
          router.push('/login');
          return;
        }
        setUserEmail(user.email || null);
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

  return (
    <main className="container mx-auto py-8">
      <div className="max-w-md mx-auto">
        <Card>
          <CardHeader>
            <CardTitle>Buyurtma muvaffaqiyatli amalga oshirildi!</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="mb-4">
              {userEmail} uchun buyurtma muvaffaqiyatli amalga oshirildi. 
              Buyurtma haqida batafsil ma&apos;lumot email orqali yuboriladi.
            </p>
            <Button onClick={() => router.push('/')}>
              Bosh sahifaga qaytish
            </Button>
          </CardContent>
        </Card>
      </div>
    </main>
  );
} 