"use client";
import { useEffect } from 'react';
import { createClient } from "@/app/utils/supabase/client"
import { useRouter } from "next/navigation"

export type Suhu = {
  id: number;
  value: number;
};
export type tinggi_air = {
  id: number;
  value: number;
  timestamp: string;
};

const supabase = createClient();

export function useRealtimeData(table: string) {
  const supabase = createClient()
    const router = useRouter()
  
    useEffect(() => {
      const channel = supabase.channel('realtime value_sensor').on('postgres_changes', {
        event: '*',
        schema: 'public',
        table: table
      }, () => {
        router.refresh()
      }).subscribe()
  
      return () => {
        supabase.removeChannel(channel)
      }
    }, [supabase, router])

}
