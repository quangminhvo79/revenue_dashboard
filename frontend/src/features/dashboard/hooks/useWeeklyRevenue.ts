import { useQuery } from "@tanstack/react-query";
import { dashboardService } from "../services/dashboard.service";
import { formatLocalDate } from "@/lib/utils";

export function useWeeklyRevenue(endDate: Date | undefined = undefined, options?: { enabled?: boolean }) {
  return useQuery({
    queryKey: ['WeeklyRevenue', endDate ? formatLocalDate(endDate) : undefined],
    queryFn: () => dashboardService.getWeeklyRevenue(endDate),
    retry: false,
    enabled: options?.enabled,
  })
}
