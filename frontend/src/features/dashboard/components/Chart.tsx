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
import { type WeeklyRevenueProps } from '@/features/dashboard/types/dashboard.type'
import { useWeeklyRevenue } from '@/features/dashboard'
import { useMemo } from "react"

const weekdayOrder = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

export function Chart({
  showPrevious,
  showEatclub,
  showPos,
  showLaborCost,
}: WeeklyRevenueProps) {
  const { data: currentWeekData } = useWeeklyRevenue();

  const previousEndDate = useMemo(() => {
    const date = new Date();
    date.setDate(date.getDate() - 7);
    return date;
  }, []);

  const { data: previousWeekData } = useWeeklyRevenue(previousEndDate, {
    enabled: showPrevious,
  });

  const chartData = useMemo(() => {
    if (!currentWeekData) return [];

    const previousByWeekday = new Map(
      (previousWeekData?.chartData ?? []).map(d => [d.weekday, d])
    );

    return currentWeekData.chartData.map(item => {
      const prev = previousByWeekday.get(item.weekday)

      return {
        ...item,
        posPrev: prev?.pos,
        eatclubPrev: prev?.eatclub,
        laborCostPrev: prev?.laborCost,
      }
    }).sort((a, b) => weekdayOrder.indexOf(a.weekday) - weekdayOrder.indexOf(b.weekday))
  }, [currentWeekData, previousWeekData])

  const chartConfig = useMemo(() => {
    return {
      pos: {
        label: `Pos Revenue${ showPrevious ? " (Current)" : '' }`,
        color: "#09090b",
      },
      eatclub: {
        label: `Eatclub Revenue${ showPrevious ? " (Current)" : '' }`,
        color: "#615fff",
      },
      laborCost: {
        label: `Labor Cost${ showPrevious ? " (Current)" : '' }`,
        color: "#e17100",
      },
      posPrev: {
        label: `Pos Revenue${ showPrevious ? " (Previous)" : '' }`,
        color: "#09090b88",
      },
      eatclubPrev: {
        label: `Eatclub Revenue${ showPrevious ? " (Previous)" : '' }`,
        color: "#615fff88",
      },
      laborCostPrev: {
        label: `Labor Cost${ showPrevious ? " (Previous)" : '' }`,
        color: "#e1710088",
      },
    }
  }, [showPrevious])

  if (!chartData) return null;

  return (
    <ChartContainer config={chartConfig} className="w-full flex-1 min-h-0 pt-10">
      <BarChart accessibilityLayer data={chartData}>
        <CartesianGrid />
        <XAxis
          dataKey="weekday"
          tickLine={false}
          tickMargin={10}
          axisLine={false}
          tickFormatter={(value) => value.slice(0, 3)}
        />
        <YAxis
          dataKey="pos"
          tickLine={false}
          tickMargin={10}
          axisLine={false}
        />
        <ChartTooltip content={<ChartTooltipContent />} />
        <ChartLegend content={<ChartLegendContent className="text-base flex-wrap"/>} />

        <Bar dataKey="pos" fill="var(--color-pos)" stackId="current" radius={showEatclub ? [0,0,4,4] : 4} hide={!showPos} />
        <Bar dataKey="eatclub" fill="var(--color-eatclub)" stackId="current" radius={showPos ? [4,4,0,0] : 4} hide={!showEatclub} />
        <Bar dataKey="laborCost" fill="var(--color-laborCost)" radius={4} hide={!showLaborCost} />

        {showPrevious && (
          <>
            <Bar dataKey="posPrev" fill="var(--color-posPrev)" stackId="prev" radius={showEatclub ? [0,0,4,4] : 4} hide={!showPos} />
            <Bar dataKey="eatclubPrev" fill="var(--color-eatclubPrev)" stackId="prev" radius={showPos ? [4,4,0,0] : 4} hide={!showEatclub} />
            <Bar dataKey="laborCostPrev" fill="var(--color-laborCostPrev)" radius={4} hide={!showLaborCost} />
          </>
        )}
      </BarChart>
    </ChartContainer>
  )
}
