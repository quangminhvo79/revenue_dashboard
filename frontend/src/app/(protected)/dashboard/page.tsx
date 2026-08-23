'use client'

import { useState } from "react"
import { DownloadIcon, ChartColumnIcon } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"

import Chart from './Chart'
import Summaries from './Summaries'


const chartData = [
  { month: "January", desktop: 186, desktop_a: 40, mobile: 80 },
  { month: "February", desktop: 305, desktop_a: 29, mobile: 200 },
  { month: "March", desktop: 237, desktop_a: 39, mobile: 120 },
  { month: "April", desktop: 73, desktop_a: 73, mobile: 190 },
  { month: "May", desktop: 209, desktop_a: 10, mobile: 130 },
  { month: "June", desktop: 214, desktop_a: 83, mobile: 140 },
  { month: "July", desktop: 224, desktop_a: 33, mobile: 240 },
]

export default function Dashboard() {
  const [isCompared, setIsCompared] = useState(false)
  const [posRevenueChecked, setPosRevenueChecked] = useState(false)
  const [eatclubRevenueChecked, setEatclubRevenueChecked] = useState(false)
  const [laborCostChecked, setLaborCostChecked] = useState(false)

  return (
    <div className="w-full flex flex-col flex-1 p-6 bg-gray-50">
      <div className="flex flex-col bg-white text-gray-800 border border-gray-200 rounded-xl p-6 w-full flex-1 min-h-0">
        <div className="flex items-center justify-between">
          <div className="text-lg font-bold">
            { isCompared ? 'This Week\'s Revenue Trend vs Previous Period' : 'This Week\'s Revenue Trend' }
          </div>
          <div className="flex items-center gap-4">
            <label className="text-gray-600 font-semibold flex items-center gap-2">
              <Checkbox
                checked={posRevenueChecked}
                onCheckedChange={setPosRevenueChecked}
              />
              <span className="w-3 inline-block border border-gray-800"></span>
              POS Revenue
            </label>
            <label className="text-gray-600 font-semibold flex items-center gap-2">
              <Checkbox checked={eatclubRevenueChecked} onCheckedChange={setEatclubRevenueChecked} />
              <span className="w-3 inline-block border border-gray-800"></span>
              Eatclub Revenue
            </label>
            <label className="text-gray-600 font-semibold flex items-center gap-2">
              <Checkbox checked={laborCostChecked} onCheckedChange={setLaborCostChecked} />
              <span className="w-3 inline-block border border-gray-800"></span>
              Labour Costs
            </label>
            <Button className="bg-gray-800 rounded-full">
              <ChartColumnIcon />
              Compare to Previous
            </Button>
            <Button variant="outline" className="font-semibold rounded-full">
              <DownloadIcon />
              Export PNG
            </Button>
          </div>
        </div>

        <div className="mt-10">
          <Summaries />
        </div>

        <Chart chartData={chartData} />
      </div>
    </div>
  )
}
