'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { supabase } from '@/lib/supabase';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';

type FormData = {
  name: string;
  price: string;
  image_url: string;
  description: string;
};

export default function AdminPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [connectionStatus, setConnectionStatus] = useState<'checking' | 'connected' | 'error'>('checking');
  const [formData, setFormData] = useState<FormData>({
    name: '',
    price: '',
    image_url: '',
    description: '',
  });

  // Check Supabase connection
  useEffect(() => {
    const checkConnection = async () => {
      try {
        const { error } = await supabase
          .from('products')
          .select('count')
          .limit(1);
        
        if (error) throw error;
        setConnectionStatus('connected');
      } catch (error) {
        console.error('Supabase connection error:', error);
        setConnectionStatus('error');
        setError('Supabase bilan bog&apos;lanishda xatolik yuz berdi. Iltimos, qayta urinib koring.');
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
      const price = parseFloat(formData.price);
      if (isNaN(price) || price <= 0) {
        throw new Error('Narx musbat son bo&apos;lishi kerak');
      }

      // Validate image URL
      try {
        new URL(formData.image_url);
      } catch {
        throw new Error('Noto&apos;g&apos;ri rasm URL manzili');
      }

      console.log('Adding product:', formData);
      const { error } = await supabase
        .from('products')
        .insert([
          {
            name: formData.name,
            price: price,
            image_url: formData.image_url,
            description: formData.description,
          },
        ]);

      if (error) throw error;
      console.log('Product added successfully');
      
      // Reset form
      setFormData({
        name: '',
        price: '',
        image_url: '',
        description: '',
      });
      
      // Show success message
      alert('Mahsulot muvaffaqiyatli qo&apos;shildi!');
    } catch (error) {
      console.error('Error adding product:', error);
      setError(error instanceof Error ? error.message : 'Kutilmagan xatolik yuz berdi. Iltimos, qayta urinib koring.');
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  if (connectionStatus === 'checking') {
    return (
      <main className="container mx-auto py-8">
        <div className="text-center">
          <p>Supabase bilan bog&apos;lanish tekshirilmoqda...</p>
        </div>
      </main>
    );
  }

  if (connectionStatus === 'error') {
    return (
      <main className="container mx-auto py-8">
        <div className="text-center text-red-500">
          <p>{error}</p>
          <p className="mt-4">Iltimos, quyidagilarni tekshiring:</p>
          <ul className="list-disc list-inside mt-2">
            <li>Supabase loyihangiz faol</li>
            <li>products jadvali mavjud</li>
            <li>RLS sozlamalari to&apos;g&apos;ri</li>
          </ul>
        </div>
      </main>
    );
  }

  return (
    <main className="container mx-auto py-8">
      <h1 className="text-3xl font-bold mb-8">Admin Panel</h1>
      
      <Card>
        <CardHeader>
          <CardTitle>Yangi mahsulot qo&apos;shish</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            {error && (
              <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
                {error}
              </div>
            )}
            
            <div className="space-y-2">
              <Label htmlFor="name">Mahsulot nomi</Label>
              <Input
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="price">Narxi</Label>
              <Input
                id="price"
                name="price"
                type="number"
                step="0.01"
                value={formData.price}
                onChange={handleChange}
                required
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="image_url">Rasm URL manzili</Label>
              <Input
                id="image_url"
                name="image_url"
                type="url"
                value={formData.image_url}
                onChange={handleChange}
                required
                placeholder="https://example.com/image.jpg"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="description">Tavsif</Label>
              <Textarea
                id="description"
                name="description"
                value={formData.description}
                onChange={handleChange}
                required
              />
            </div>
            
            <Button type="submit" disabled={loading}>
              {loading ? "Yuklanmoqda..." : "Mahsulot qo&apos;shish"}
            </Button>
          </form>
        </CardContent>
      </Card>
    </main>
  );
}