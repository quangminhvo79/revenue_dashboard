'use client'

export default function Chart() {
  return (
    <div className="grid grid-cols-3 gap-4">
      <div className="bg-gray-100 p-4 rounded-lg">
        <div className="text-gray-500 text-sm font-semibold">Total Revenue</div>
        <div className="flex items-center gap-4">
          <div className="current-value text-gray-800 text-xl font-semibold">$15,974</div>
          <div className="previous-value text-gray-500 text-sm font-semibold space-x-2">
            <span>vs $14,982</span>
            <span className="text-green-500">(+6.6%)</span>
          </div>
        </div>
      </div>
      <div className="bg-gray-100 p-4 rounded-lg">
        <div className="text-gray-500 text-sm font-semibold">Average per Day</div>
        <div className="flex items-center gap-4">
          <div className="current-value text-gray-800 text-xl font-semibold">$2,282</div>
          <div className="previous-value text-gray-500 text-sm font-semibold space-x-2">
            <span>vs $2,140</span>
            <span className="text-green-500">(+6.6%)</span>
          </div>
        </div>
      </div>
      <div className="bg-gray-100 p-4 rounded-lg">
        <div className="text-gray-500 text-sm font-semibold">Total Covers</div>
        <div className="flex items-center gap-4">
          <div className="current-value text-gray-800 text-xl font-semibold">871</div>
          <div className="previous-value text-gray-500 text-sm font-semibold space-x-2">
            <span>vs 820</span>
            <span className="text-green-500">(+6.2%)</span>
          </div>
        </div>
      </div>
    </div>
  )
}
