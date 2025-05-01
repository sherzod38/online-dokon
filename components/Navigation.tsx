'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useCart } from '@/context/CartContext';
import { Menu, X } from 'lucide-react';

export default function Navigation() {
  const { totalItems } = useCart();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav className="bg-white shadow-sm">
      <div className="container mx-auto px-4 py-3">
        <div className="flex justify-between items-center">
          <Link href="/" className="text-xl font-bold">
            Online Do&apos;kon
          </Link>
          
          {/* Mobil menu tugmasi */}
          <button 
            className="md:hidden"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>

          {/* Desktop menu */}
          <div className="hidden md:flex gap-4">
            <Link href="/cart" className="px-4 py-2 hover:text-blue-600 relative">
              <span>Savatcha</span>
              <span className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full min-w-[20px] h-[20px] flex items-center justify-center text-xs">
                {totalItems || 0}
              </span>
            </Link>
            <Link href="/contact" className="px-4 py-2 hover:text-blue-600">
              Bog&apos;lanish
            </Link>
            <Link href="/login" className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700">
              Kirish / Ro&apos;yxatdan o&apos;tish
            </Link>
          </div>
        </div>

        {/* Mobil menu */}
        {isMenuOpen && (
          <div className="md:hidden mt-4 space-y-2">
            <Link 
              href="/cart" 
              className="block px-4 py-2 hover:bg-gray-100 rounded relative"
              onClick={() => setIsMenuOpen(false)}
            >
              <span>Savatcha</span>
              <span className="absolute top-2 right-4 bg-red-500 text-white rounded-full min-w-[20px] h-[20px] flex items-center justify-center text-xs">
                {totalItems || 0}
              </span>
            </Link>
            <Link 
              href="/contact" 
              className="block px-4 py-2 hover:bg-gray-100 rounded"
              onClick={() => setIsMenuOpen(false)}
            >
              Bog&apos;lanish
            </Link>
            <Link 
              href="/login" 
              className="block px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
              onClick={() => setIsMenuOpen(false)}
            >
              Kirish / Ro&apos;yxatdan o&apos;tish
            </Link>
          </div>
        )}
      </div>
    </nav>
  );
}