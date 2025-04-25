"use client"
import { Thermometer } from "lucide-react"
import { Line, CartesianGrid, XAxis, YAxis, Bar, ComposedChart } from "recharts"

import { ChartConfig, ChartContainer,  ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import { useRealtimeData } from "@/app/utils/realtimedata"

let chartData = [
  { no: "1", suhu: 186, 0: 186,1: 186 },
  { no: "2", suhu: 305, 0: 105,1: 305 },
  { no: "3", suhu: 237, 0: 137,1: 237 },
  { no: "4", suhu: 73, 0: 13,1: 73 },
  { no: "5", suhu: 209, 0: 109,1: 209 },
  { no: "6", suhu: 214, 0: 114,1: 214 },
  { no: "7", suhu: 305, 0: 105,1: 305 },
  { no: "8", suhu: 237, 0: 137,1: 237 },
  { no: "9", suhu: 73, 0: 13,1: 73 },
  { no: "10", suhu: 209, 0: 109,1: 209 },
]

const chartConfig = {
  suhu: {
    icon: Thermometer,
    label: "Suhu",
    // color: "#2563eb",
  },
} satisfies ChartConfig

type valueSensor = {
  id: number,
  value: number,
}

export function Grafik({sensor} : {sensor: valueSensor[]}) {
  useRealtimeData("sensor_suhu")
  sensor?.map(() => {
    const first10 = sensor.slice(0, 10)
    const middle10 = sensor.slice(-20, -10)
    const last10 = sensor.slice(-10)
    chartData = Array.from({ length: 10 }, (_, i) => ({
      no: (i + 1).toString(),
      0: first10[i]?.value ?? 0,
      1: middle10[i]?.value ?? 0,
      suhu: last10[i]?.value ?? 0,
    }));
  })

  return (
    <ChartContainer config={chartConfig} className="min-h-[200px] w-full">
      <ComposedChart accessibilityLayer data={chartData}>
        <defs>
            <filter id="glow" x="-50%" y="-50%" width="200%" height="200%">
              <feGaussianBlur stdDeviation="3.5" result="coloredBlur" />
              <feMerge>
                <feMergeNode in="coloredBlur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
        </defs>
        <CartesianGrid vertical={false} />
        <XAxis
            dataKey="no"
            tickLine={false}
            tickMargin={10}
            axisLine={false}
            tickFormatter={(value) => value.slice(0, 3)}
        />
        <YAxis
            dataKey="suhu"
        />
        <ChartTooltip content={<ChartTooltipContent labelKey="suhu"/>} />
        <Bar dataKey="1" barSize={40} radius={[8, 8, 0, 0]} opacity={.3} fill="#2b4539"  />
        <Line type="monotone" dataKey="0" radius={4} dot={false} stroke="#61b3dc" strokeWidth={2} style={{ filter: "url(#glow)" }}/>
        <Line type="monotone" dataKey="suhu" radius={4} dot={false} stroke="#61dca3" strokeWidth={2} style={{ filter: "url(#glow)" }}/>
      </ComposedChart>
    </ChartContainer>
  )
}
