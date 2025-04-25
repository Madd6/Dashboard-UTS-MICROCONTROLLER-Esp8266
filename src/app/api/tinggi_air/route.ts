import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/app/utils/supabase/server';

export async function GET(request: NextRequest) {
  try {
    const supabase = await createClient();
    let { data: value_sensor, error } = await supabase
        .from('tinggi_air')
        .select('*')
    if (error) {
        throw error;
    }
    return NextResponse.json({result: value_sensor});
  }   catch (err: any) {
        console.error('Error:', err);
        return NextResponse.json({ 
          error: err.message || 'Unknown error', 
          details: err 
        });
    }
}

export async function POST(request: NextRequest) {
    try {
      const body = await request.json()
      const { value_sensor } = body
  
      const supabase = await createClient();
      const { data, error } = await supabase
        .from('tinggi_air')
        .insert([{ value: value_sensor }])
        .select()
  
      if (error) throw error;
  
      return NextResponse.json({ result: data });
    }  catch (err: any) {
        console.error('Error:', err);
        return NextResponse.json({ 
          error: err.message || 'Unknown error', 
          details: err 
        });
    }
  }
  