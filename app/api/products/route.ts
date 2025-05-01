import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';

export async function POST(request: Request) {
  try {
    const { name, price, image_url, description } = await request.json();

    // Ma'lumotlarni tekshirish
    if (!name || !price || !image_url || !description) {
      return NextResponse.json(
        { error: 'Barcha maydonlar to\'ldirilishi shart' },
        { status: 400 }
      );
    }

    // Supabase ga saqlash
    const { data, error } = await supabase
      .from('products')
      .insert([
        {
          name,
          price,
          image_url,
          description,
          created_at: new Date().toISOString()
        }
      ])
      .select();

    if (error) {
      console.error('Supabase xatosi:', error);
      return NextResponse.json(
        { error: 'Mahsulotni saqlashda xatolik: ' + error.message },
        { status: 500 }
      );
    }

    return NextResponse.json({ success: true, data });
  } catch (error) {
    console.error('Server xatosi:', error);
    return NextResponse.json(
      { error: 'Server xatosi yuz berdi' },
      { status: 500 }
    );
  }
}