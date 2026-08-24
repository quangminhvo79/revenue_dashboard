export interface RevenueChartData {
  weekday: string
  pos: number
  eatclub: number
  laborCost: number
}

export interface WeeklyRevenue {
  pos: number
  eatclub: number
  totalCovers: number
  laborCost: number
  chartData: RevenueChartData[]
}


export interface WeeklyRevenueProps {
  showPrevious: boolean
  showEatclub: boolean
  showPos: boolean,
  showLaborCost: boolean,
}
