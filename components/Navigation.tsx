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
            Online Do&apos;kon
          </Link>
          <div className="flex gap-4">
            <Link 
              href="/cart" 
              className="px-4 py-2 hover:text-blue-600 relative"
            >
              <span>Savatcha</span>
              <span className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full min-w-[20px] h-[20px] flex items-center justify-center text-xs">
                {totalItems || 0}
              </span>
            </Link>
            <Link 
              href="/login" 
              className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
            >
              Kirish / Ro&apos;yxatdan o&apos;tish
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}