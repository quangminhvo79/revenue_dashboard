'use client'

import { useWeeklyRevenue } from '@/features/dashboard';
import { useMemo } from 'react';
import { type WeeklyRevenueProps } from '@/features/dashboard/types/dashboard.type'
import { formatNumber, calculatePercentageChange, percentageChangeClassName } from '@/lib/utils';

export function Summaries({
  showPrevious,
  showEatclub,
  showPos,
}: WeeklyRevenueProps) {
  const { data: currentWeekData } = useWeeklyRevenue();
  const previousEndDate = useMemo(() => {
    const date = new Date();
    date.setDate(date.getDate() - 7);
    return date;
  }, []);

  const {
    data: previousWeekData,
    isFetched: isFetched
  } = useWeeklyRevenue(previousEndDate, {
    enabled: showPrevious,
  });

  const totalRevenue = useMemo(() => {
    if (currentWeekData)
      if (showEatclub && showPos)
        return currentWeekData?.eatclub + currentWeekData?.pos;
      else if (showEatclub)
        return currentWeekData?.eatclub;
      else return currentWeekData?.pos;
    return 0;
  }, [currentWeekData, showEatclub, showPos])

  const totalPrevRevenue = useMemo(() => {
    if (previousWeekData)
      if (showEatclub && showPos)
        return previousWeekData?.eatclub + previousWeekData?.pos;
      else if (showEatclub)
        return previousWeekData?.eatclub;
      else return previousWeekData?.pos;
    return 0;
  }, [previousWeekData, showEatclub, showPos])

  const percentageChanges = useMemo(() => {
    if (!showPrevious) return {
      totalRevenueChange: 0,
      averagePerDayChange: 0,
      laborCostChange: 0
    };

    return {
      totalRevenueChange: calculatePercentageChange(totalRevenue, totalPrevRevenue),
      averagePerDayChange: calculatePercentageChange(totalRevenue/7, totalPrevRevenue/7),
      laborCostChange: calculatePercentageChange(currentWeekData?.totalCovers ?? 0, previousWeekData?.totalCovers ?? 0),
    }
  }, [previousWeekData?.totalCovers, showPrevious, totalPrevRevenue, totalRevenue, currentWeekData?.totalCovers])

  return (
    <div className="grid grid-cols-3 gap-4">
      <div className="bg-gray-100 p-4 rounded-lg">
        <div className="text-gray-500 text-sm font-semibold">Total Revenue</div>
        <div className="flex items-center gap-2">
          <div className="current-value text-gray-800 text-xl font-semibold">${formatNumber(totalRevenue)}</div>
          {showPrevious && isFetched && (
            <div className="previous-value text-gray-500 text-sm font-semibold space-x-2">
              <span>vs</span>
              <span>${formatNumber(totalPrevRevenue)}</span>
              <span className={percentageChangeClassName(percentageChanges.totalRevenueChange)}>
                ({`${percentageChanges.totalRevenueChange > 0 ? '+' : '-'}${formatNumber(percentageChanges.totalRevenueChange)}`}%)
              </span>
            </div>
          )}
        </div>
      </div>
      <div className="bg-gray-100 p-4 rounded-lg">
        <div className="text-gray-500 text-sm font-semibold">Average per Day</div>
        <div className="flex items-center gap-2">
          <div className="current-value text-gray-800 text-xl font-semibold">${formatNumber(totalRevenue/7)}</div>
          {showPrevious && isFetched && (
            <div className="previous-value text-gray-500 text-sm font-semibold space-x-2">
              <span>vs</span>
              <span>${formatNumber(totalPrevRevenue/7)}</span>
              <span className={percentageChangeClassName(percentageChanges.averagePerDayChange)}>
                ({`${percentageChanges.averagePerDayChange > 0 ? '+' : '-'}${formatNumber(percentageChanges.averagePerDayChange)}`}%)
              </span>
            </div>
          )}
        </div>
      </div>
      <div className="bg-gray-100 p-4 rounded-lg">
        <div className="text-gray-500 text-sm font-semibold">Total Covers</div>
        <div className="flex items-center gap-2">
          <div className="current-value text-gray-800 text-xl font-semibold">{formatNumber(currentWeekData?.totalCovers || 0)}</div>
          {isFetched && showPrevious && (
            <div className="previous-value text-gray-500 text-sm font-semibold space-x-2">
              <span>vs</span>
              <span>{formatNumber(previousWeekData?.totalCovers || 0)}</span>
              <span className={percentageChangeClassName(percentageChanges.laborCostChange)}>
                ({`${percentageChanges.laborCostChange > 0 ? '+' : '-'}${formatNumber(percentageChanges.laborCostChange)}`}%)
              </span>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
