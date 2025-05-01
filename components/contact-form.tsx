'use client';

import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export function ContactForm() {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Xabar yuborishda xatolik');
      }
      
      setFormData({ name: '', email: '', message: '' });
      alert('Xabaringiz muvaffaqiyatli yuborildi!');
    } catch (err) {
      if (err instanceof Error) {
        alert(err.message);
      } else {
        alert('Xatolik yuz berdi. Iltimos qayta urinib ko\'ring.');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card className="max-w-2xl mx-auto w-full px-4 sm:px-0">
      <CardHeader>
        <CardTitle className="text-center text-2xl sm:text-3xl">Ro&apos;yxatdan o&apos;ting</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name" className="text-base sm:text-lg">Ismingiz</Label>
            <Input
              id="name"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              required
              className="p-2 sm:p-3 text-base sm:text-lg"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="email" className="text-base sm:text-lg">Email</Label>
            <Input
              id="email"
              type="email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              required
              className="p-2 sm:p-3 text-base sm:text-lg"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="message" className="text-base sm:text-lg">Xabar</Label>
            <Textarea
              id="message"
              value={formData.message}
              onChange={(e) => setFormData({ ...formData, message: e.target.value })}
              required
              className="p-2 sm:p-3 text-base sm:text-lg min-h-[100px]"
            />
          </div>
          <Button 
            type="submit" 
            disabled={loading}
            className="w-full py-2 sm:py-3 text-base sm:text-lg"
          >
            {loading ? "Yuklanmoqda..." : "Yuborish"}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}