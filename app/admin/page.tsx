'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { supabase } from '@/lib/supabase';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Product } from '@/types';

export default function AdminPage() {
  const router = useRouter();
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [description, setDescription] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [connectionStatus, setConnectionStatus] = useState<'checking' | 'connected' | 'error'>('checking');

  // Check Supabase connection on component mount
  useEffect(() => {
    const checkConnection = async () => {
      try {
        const { data, error } = await supabase.from('products').select('count').limit(1);
        if (error) {
          console.error('Supabase connection error:', error);
          setConnectionStatus('error');
          setError(`Supabase bilan bog'lanishda xatolik: ${error.message}`);
        } else {
          setConnectionStatus('connected');
        }
      } catch (err) {
        console.error('Unexpected error checking connection:', err);
        setConnectionStatus('error');
        setError('Kutilmagan xatolik yuz berdi. Iltimos, qayta urinib koring.');
      }
    };

    checkConnection();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      // Validate price
      const priceValue = parseFloat(price);
      if (isNaN(priceValue) || priceValue <= 0) {
        throw new Error("Narx noto'g'ri formatda. Iltimos, musbat son kiriting.");
      }

      // Validate image URL
      try {
        new URL(imageUrl);
      } catch (e) {
        throw new Error("Rasm URL noto'g'ri formatda. Iltimos, to'g'ri URL kiriting.");
      }

      console.log('Attempting to insert product:', { name, price: priceValue, image_url: imageUrl, description });
      
      const { data, error } = await supabase.from('products').insert([
        {
          name,
          price: priceValue,
          image_url: imageUrl,
          description,
        },
      ]).select();

      if (error) {
        console.error('Supabase error:', error);
        throw new Error(`Xatolik: ${error.message}`);
      }

      console.log('Product inserted successfully:', data);

      // Reset form
      setName('');
      setPrice('');
      setImageUrl('');
      setDescription('');

      alert("Mahsulot muvaffaqiyatli qo'shildi!");
    } catch (error) {
      console.error('Error adding product:', error);
      setError(error instanceof Error ? error.message : "Mahsulot qo'shishda xatolik yuz berdi.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="container mx-auto py-8">
      <h1 className="text-3xl font-bold mb-8">Admin Dashboard</h1>
      
      {connectionStatus === 'checking' && (
        <div className="bg-yellow-100 border border-yellow-400 text-yellow-700 px-4 py-3 rounded mb-4">
          Supabase bilan bog'lanish tekshirilmoqda...
        </div>
      )}
      
      {connectionStatus === 'error' && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          <p className="font-bold">Supabase bilan bog'lanishda muammo!</p>
          <p>Iltimos, quyidagilarni tekshiring:</p>
          <ul className="list-disc pl-5 mt-2">
            <li>Supabase loyihangiz faol ekanligini</li>
            <li>products jadvali mavjudligini</li>
            <li>RLS (Row Level Security) sozlamalarini</li>
          </ul>
        </div>
      )}
      
      <Card>
        <CardHeader>
          <CardTitle>Yangi mahsulot qo'shish</CardTitle>
        </CardHeader>
        <CardContent>
          {error && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
              {error}
            </div>
          )}
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="name" className="block text-sm font-medium mb-1">
                Mahsulot nomi
              </label>
              <Input
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>
            <div>
              <label htmlFor="price" className="block text-sm font-medium mb-1">
                Narxi
              </label>
              <Input
                id="price"
                type="number"
                step="0.01"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                required
              />
            </div>
            <div>
              <label htmlFor="imageUrl" className="block text-sm font-medium mb-1">
                Rasm URL
              </label>
              <Input
                id="imageUrl"
                type="url"
                value={imageUrl}
                onChange={(e) => setImageUrl(e.target.value)}
                required
                placeholder="https://picsum.photos/800/600"
              />
            </div>
            <div>
              <label htmlFor="description" className="block text-sm font-medium mb-1">
                Tavsif
              </label>
              <Textarea
                id="description"
                value={description}
                onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => setDescription(e.target.value)}
                required
              />
            </div>
            <Button type="submit" disabled={loading || connectionStatus === 'error'}>
              {loading ? "Yuklanmoqda..." : "Mahsulot qo'shish"}
            </Button>
          </form>
        </CardContent>
      </Card>
    </main>
  );
}