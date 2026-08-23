import { useMutation } from "@tanstack/react-query";
import { authSessionService } from "@/features/auth";
import { useAuth } from "./useAuth";

export function useLogout() {
  const { setUser } = useAuth();

  return useMutation({
    mutationFn: authSessionService.logout,
    onSuccess: () => {
      setUser(null);
    },
  });
}
