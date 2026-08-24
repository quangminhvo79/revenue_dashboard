import { type ChartData } from '@/features/dashboard'
import { useXAxisTicks, useYAxisScale, ZIndexLayer, DefaultZIndexes } from "recharts"
import { TrendingUp, TrendingDown } from "lucide-react"

const EVENT_MARKER_OFFSET = 24;

export default function EventImpactMarkers({
  data,
  showPos,
  showEatclub,
  showLaborCost,
  showPrevious,
}: {
  data: ChartData[]
  showPos: boolean
  showEatclub: boolean
  showLaborCost: boolean
  showPrevious: boolean
}) {
  const ticks = useXAxisTicks();
  const yScale = useYAxisScale();

  if (!ticks || !yScale) return null;

  return (
    <ZIndexLayer zIndex={DefaultZIndexes.label}>
      <g>
        {data.map((item) => {
          if (item.eventImpact === 0) return null;

          const tick = ticks.find((t) => t.value === item.weekday);
          if (!tick) return null;

          const currentTotal = (showPos ? item.pos : 0) + (showEatclub ? item.eatclub : 0);
          const previousTotal = showPrevious
            ? (showPos ? item.posPrev ?? 0 : 0) + (showEatclub ? item.eatclubPrev ?? 0 : 0)
            : 0;
          const laborTotal = showLaborCost ? item.laborCost : 0;
          const previousLaborTotal = showPrevious && showLaborCost ? item.laborCostPrev ?? 0 : 0;
          const maxValue = Math.max(currentTotal, previousTotal, laborTotal, previousLaborTotal, 0);

          const cx = tick.coordinate;
          const y = yScale(maxValue);
          if (y == null) return null;
          const cy = y - EVENT_MARKER_OFFSET;

          const isPositive = item.eventImpact > 0;
          const Icon = isPositive ? TrendingUp : TrendingDown;
          const fill = isPositive ? "#dcfce7" : "#fee2e2";
          const stroke = isPositive ? "#16a34a" : "#ea7e7e";

          return (
            <g key={item.weekday} transform={`translate(${cx}, ${cy})`}>
              <circle r={12} fill={fill} stroke={stroke} strokeWidth={1} />
              <Icon x={-8} y={-8} width={16} height={16} color={stroke} strokeWidth={2} />
            </g>
          );
        })}
      </g>
    </ZIndexLayer>
  );
}
