import camelcaseKeys from 'camelcase-keys';
import { apiClient } from "@/lib/api/client";
import { type WeeklyRevenue } from "../types/dashboard.type";

export const dashboardService = {
  async getWeeklyRevenue(endDate: Date | undefined): Promise<WeeklyRevenue> {
    const response = await apiClient.get("/dashboard/weekly_revenue", {
      params: {
        end_date: endDate
      }
    });

    return camelcaseKeys(response.data, { deep: true });
  },
};
