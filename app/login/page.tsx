'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { supabase } from '@/lib/supabase';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

type User = {
  id: string;
  email: string;
};

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

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
      router.push('/success');
    } catch (error) {
      console.error('Login error:', error);
      setError('Login yoki parol noto&apos;g&apos;ri');
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
      router.push('/success');
    } catch (error) {
      console.error('Signup error:', error);
      setError('Ro&apos;yxatdan o&apos;tishda xatolik yuz berdi');
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="container mx-auto py-8">
      <div className="max-w-md mx-auto">
        <Card>
          <CardHeader>
            <CardTitle>Kirish / Ro&apos;yxatdan o&apos;tish</CardTitle>
          </CardHeader>
          <CardContent>
            <form className="space-y-4">
              {error && (
                <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
                  {error}
                </div>
              )}
              
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="password">Parol</Label>
                <Input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
              
              <div className="flex gap-4">
                <Button
                  type="button"
                  onClick={handleLogin}
                  disabled={loading}
                  className="flex-1"
                >
                  {loading ? "Yuklanmoqda..." : "Kirish"}
                </Button>
                <Button
                  type="button"
                  onClick={handleSignUp}
                  disabled={loading}
                  variant="outline"
                  className="flex-1"
                >
                  {loading ? "Yuklanmoqda..." : "Ro&apos;yxatdan o&apos;tish"}
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </main>
  );
}
