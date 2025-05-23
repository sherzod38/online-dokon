'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useCart } from '@/context/CartContext';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import Image from 'next/image';
import Link from 'next/link';

export default function CartPage() {
  const router = useRouter();
  const { items, removeFromCart, updateQuantity, totalItems, totalPrice, clearCart } = useCart();
  const [loading, setLoading] = useState(false);

  const handleCheckout = async () => {
    setLoading(true);
    
    try {
      // Local storage dan foydalanuvchi ma'lumotlarini tekshirish
      const userData = localStorage.getItem('userData');
      
      if (!userData) {
        // Agar foydalanuvchi ro'yxatdan o'tmagan bo'lsa contact sahifasiga yo'naltirish
        router.push('/contact');
        return;
      }
      
      // Ro'yxatdan o'tgan foydalanuvchi uchun
      clearCart(); // Savatchani tozalash
      router.push('/success');
    } catch (error) {
      console.error('Checkout error:', error);
      alert('Xatolik yuz berdi. Iltimos qayta urinib ko\'ring.');
    } finally {
      setLoading(false);
    }
  };

  if (!items || items.length === 0) {
    return (
      <main className="container mx-auto py-8">
        <h1 className="text-3xl font-bold mb-8">Savatcha</h1>
        <Card>
          <CardContent className="py-8">
            <div className="text-center">
              <p className="text-xl mb-4">Savatchangiz bo&apos;sh</p>
              <Button 
                asChild 
                className="cursor-pointer hover:bg-green-500 hover:text-white transition-colors"
              >
                <Link href="/">Mahsulotlarni ko&apos;rish</Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      </main>
    );
  }

  return (
    <main className="container mx-auto py-8">
      <h1 className="text-3xl font-bold mb-8">Savatcha</h1>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          {items.map((item) => (
            <Card key={item.id} className="mb-4">
              <CardContent className="p-4">
                <div className="flex items-center gap-4">
                  <div className="relative h-20 w-20 flex-shrink-0">
                    <Image
                      src={item.image_url}
                      alt={item.name}
                      fill
                      className="object-cover rounded"
                    />
                  </div>
                  <div className="flex-grow">
                    <h3 className="font-medium">{item.name}</h3>
                    <p className="text-gray-500">${item.price.toFixed(2)}</p>
                    <div className="flex items-center mt-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        className="h-8 w-8 p-0"
                      >
                        +
                      </Button>
                      <span className="mx-2 w-8 text-center">{item.quantity}</span>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => updateQuantity(item.id, Math.max(0, item.quantity - 1))}
                        className="h-8 w-8 p-0"
                      >
                        -
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => removeFromCart(item.id)}
                        className="ml-auto text-red-500 hover:text-red-700"
                      >
                        O&apos;chirish
                      </Button>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-medium">${(item.price * item.quantity).toFixed(2)}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
        
        <div>
          <Card>
            <CardHeader>
              <CardTitle>Buyurtma xulosasi</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex justify-between mb-2">
                <span>Mahsulotlar ({totalItems})</span>
                <span>${totalPrice.toFixed(2)}</span>
              </div>
              <div className="flex justify-between font-bold text-lg mt-4 pt-4 border-t">
                <span>Jami</span>
                <span>${totalPrice.toFixed(2)}</span>
              </div>
            </CardContent>
            <CardFooter>
              <Button 
                className={`w-full cursor-pointer transition-all duration-300 ${
                  loading 
                    ? "bg-red-500 text-white" 
                    : "hover:bg-green-500 hover:text-white"
                }`}
                size="lg"
                onClick={handleCheckout}
                disabled={loading}
              >
                {loading ? "Yuklanmoqda..." : "Sotib olish"}
              </Button>
            </CardFooter>
          </Card>
        </div>
      </div>
    </main>
  );
}