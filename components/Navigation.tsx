'use client';

import Link from 'next/link';
import { useCart } from '@/context/CartContext';

export default function Navigation() {
  const { totalItems } = useCart();

  return (
    <nav className="bg-white shadow-sm">
      <div className="container mx-auto px-4 py-3">
        <div className="flex justify-between items-center">
          <Link href="/" className="text-xl font-bold">
            Online Do'kon
          </Link>
          <div className="flex gap-4">
            <Link 
              href="/cart" 
              className="px-4 py-2 hover:text-blue-600 relative flex items-center"
            >
              <span className="mr-2">Savatcha</span>
              {totalItems > 0 && (
                <span className="bg-red-500 text-white rounded-full px-2 py-1 text-xs min-w-[20px] h-[20px] flex items-center justify-center">
                  {totalItems}
                </span>
              )}
            </Link>
            <Link 
              href="/login" 
              className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
            >
              Kirish / Ro'yxatdan o'tish
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}