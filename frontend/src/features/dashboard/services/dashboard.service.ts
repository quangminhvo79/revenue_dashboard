import camelcaseKeys from 'camelcase-keys';
import { apiClient } from "@/lib/api/client";
import { formatLocalDate } from "@/lib/utils";
import { type WeeklyRevenueResponse } from "../types/dashboard.type";

export const dashboardService = {
  async getWeeklyRevenue(endDate: Date | undefined): Promise<WeeklyRevenueResponse> {
    const response = await apiClient.get("/dashboard/weekly_revenue", {
      params: {
        end_date: endDate ? formatLocalDate(endDate) : undefined
      }
    });

    return camelcaseKeys(response.data, { deep: true });
  },
};
