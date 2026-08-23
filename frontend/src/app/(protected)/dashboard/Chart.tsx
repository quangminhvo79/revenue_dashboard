'use client'

import { Bar, BarChart, CartesianGrid, XAxis, YAxis } from "recharts"
import {
  ChartContainer,
  type ChartConfig,
  ChartTooltip,
  ChartTooltipContent,
  ChartLegend,
  ChartLegendContent
} from "@/components/ui/chart"
import { ChartData } from "recharts/types/state/chartDataSlice"

const chartConfig = {
  desktop: {
    label: "Desktop",
    color: "#2563eb",
  },
  desktop_a: {
    label: "Desktop Other",
    color: "#ff8904",
  },
  mobile: {
    label: "Mobile",
    color: "#60a5fa",
  },
} satisfies ChartConfig

export default function Chart({ chartData }: { chartData: ChartData}) {
  return (
    <ChartContainer config={chartConfig} className="w-full flex-1 min-h-0 pt-10">
      <BarChart accessibilityLayer data={chartData}>
        <CartesianGrid />
        <XAxis
          dataKey="month"
          tickLine={false}
          tickMargin={10}
          axisLine={false}
          tickFormatter={(value) => value.slice(0, 3)}
        />
        <YAxis
          dataKey="desktop"
          tickLine={false}
          tickMargin={10}
          axisLine={false}
        />
        <ChartTooltip content={<ChartTooltipContent />} />
        <ChartLegend content={<ChartLegendContent />} />
        <Bar dataKey="desktop" fill="var(--color-desktop)" stackId="a" radius={[0,0,4,4]} />
        <Bar dataKey="desktop_a" fill="var(--color-desktop_a)" stackId="a" radius={[4,4,0,0]} />
        <Bar dataKey="mobile" fill="var(--color-mobile)" radius={4} />
      </BarChart>
    </ChartContainer>
  )
}
