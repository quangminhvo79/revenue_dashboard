import { useQuery } from "@tanstack/react-query";
import { authService } from "@/features/auth";

export function useMe() {
  return useQuery({
    queryKey: ["me"],
    queryFn: authService.me,
    retry: false
  });
}
