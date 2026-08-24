import { useQuery } from "@tanstack/react-query";
import { dashboardService } from "../services/dashboard.service";

export function useWeeklyRevenue(endDate: Date | undefined = undefined, options?: { enabled?: boolean }) {
  return useQuery({
    queryKey: ['WeeklyRevenue', endDate],
    queryFn: () => dashboardService.getWeeklyRevenue(endDate),
    retry: false,
    enabled: options?.enabled,
  })
}
