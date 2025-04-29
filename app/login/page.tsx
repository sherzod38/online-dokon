'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { supabase } from '@/lib/supabase';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import Link from 'next/link';

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    const checkUser = async () => {
      const { data } = await supabase.auth.getUser();
      setUser(data.user);
      
      if (data.user) {
        // If user is already logged in, redirect to home
        router.push('/');
      }
    };
    
    checkUser();
  }, [router]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) throw error;

      // Redirect to home page after successful login
      router.push('/');
    } catch (error: any) {
      console.error('Login error:', error);
      setError(error.message || 'Kirishda xatolik yuz berdi');
    } finally {
      setLoading(false);
    }
  };

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const { error } = await supabase.auth.signUp({
        email,
        password,
      });

      if (error) throw error;

      setError('Tasdiqlash emaili yuborildi. Iltimos, emailingizni tekshiring.');
    } catch (error: any) {
      console.error('Sign up error:', error);
      setError(error.message || 'Ro\'yxatdan o\'tishda xatolik yuz berdi');
    } finally {
      setLoading(false);
    }
  };

  if (user) {
    return null; // Will redirect in useEffect
  }

  return (
    <main className="container mx-auto py-8">
      <div className="max-w-md mx-auto">
        <Card>
          <CardHeader>
            <CardTitle>Kirish</CardTitle>
            <CardDescription>
              Hisobingizga kiring yoki yangi hisob yarating
            </CardDescription>
          </CardHeader>
          <CardContent>
            {error && (
              <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
                {error}
              </div>
            )}
            <form onSubmit={handleLogin} className="space-y-4">
              <div>
                <label htmlFor="email" className="block text-sm font-medium mb-1">
                  Email
                </label>
                <Input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              <div>
                <label htmlFor="password" className="block text-sm font-medium mb-1">
                  Parol
                </label>
                <Input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
              <div className="flex gap-2">
                <Button type="submit" className="flex-1" disabled={loading}>
                  {loading ? "Yuklanmoqda..." : "Kirish"}
                </Button>
                <Button 
                  type="button" 
                  variant="outline" 
                  className="flex-1" 
                  onClick={handleSignUp}
                  disabled={loading}
                >
                  Ro'yxatdan o'tish
                </Button>
          </div>
            </form>
          </CardContent>
          <CardFooter className="flex justify-center">
            <Link href="/" className="text-sm text-blue-500 hover:underline">
              Bosh sahifaga qaytish
            </Link>
          </CardFooter>
        </Card>
      </div>
    </main>
  );
}
