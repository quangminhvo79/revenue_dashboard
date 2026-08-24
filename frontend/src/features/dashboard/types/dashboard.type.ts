export interface ResponseChartData {
  weekday: string
  pos: number
  eatclub: number
  laborCost: number
  eventImpact: number
}

export type ChartData = ResponseChartData & {
  posPrev?: number
  eatclubPrev?: number
  laborCostPrev?: number
}

export interface WeeklyRevenueResponse {
  pos: number
  eatclub: number
  totalCovers: number
  laborCost: number
  chartData: ResponseChartData[]
}

export interface WeeklyRevenueProps {
  showPrevious: boolean
  showEatclub: boolean
  showPos: boolean,
  showLaborCost: boolean,
}
