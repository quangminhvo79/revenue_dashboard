'use client';

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/features/auth";

export default function ProtectedLayout({ children }: LayoutProps<"/">) {
  const router = useRouter();

  const {
    isLoading,
    isAuthenticated,
  } = useAuth();

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      router.replace("/login");
    }
  }, [
    isLoading,
    isAuthenticated,
    router,
  ]);

  if (isLoading) {
    return (<div className="w-screen h-screen flex items-center justify-center">
      <svg className="mr-3 -ml-1 w-10 h-10 animate-spin text-gray-800" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
      </svg>
    </div>);
  }

  if (!isAuthenticated) {
    return null;
  }

  return children;
}
