"use client";

import { useRouter } from "next/navigation";
import { useMutation } from "@tanstack/react-query";
import { authSessionService, LoginPayload} from "@/features/auth";
import { useAuth } from "./useAuth";

export function useLogin() {
  const router = useRouter();
  const { setUser } = useAuth();

  return useMutation({
    mutationFn: (payload: LoginPayload) => authSessionService.login(payload),
    onSuccess: (user) => {
      setUser(user);
      router.replace('/')
    },
    onError: (e) => {
      console.log('errror', e)
    }
  });
}
