"use client";

import Link from "next/link";
import { useAuth, LogoutForm } from "@/features/auth"

export default function Home() {
  const {
    isLoading,
    user: currentUser
  } = useAuth();

  return (
    <div className="flex flex-1 flex-col items-center justify-center bg-zinc-50 px-6 font-sans dark:bg-black">
      <div className="flex flex-col items-center gap-6 text-center">
        <h1 className="text-4xl font-semibold tracking-tight text-black dark:text-zinc-50">
          Revenue Dashboard
        </h1>
        {isLoading ? (
          <div>
            <svg className="mr-3 -ml-1 w-10 h-10 animate-spin text-gray-800" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
          </div>
        ) : (currentUser ? (
            <>
              <p className="max-w-md text-lg leading-8 text-zinc-600 dark:text-zinc-400">
                Welcome back, {currentUser.email}
              </p>
              <div className="flex items-center gap-2">
                <Link
                  className="flex h-12 items-center justify-center rounded-full bg-foreground px-8 text-base font-medium text-background transition-colors hover:bg-[#383838] dark:hover:bg-[#ccc]"
                  href="/dashboard"
                >
                  Dashboard
                </Link>
                <LogoutForm />
              </div>
            </>
          ) : (
            <>
              <p className="max-w-md text-lg leading-8 text-zinc-600 dark:text-zinc-400">
                Track and analyze your revenue in one place.
              </p>
              <Link
                className="flex h-12 items-center justify-center rounded-full bg-foreground px-8 text-base font-medium text-background transition-colors hover:bg-[#383838] dark:hover:bg-[#ccc]"
                href="/login"
              >
                Log in
              </Link>
            </>
          )
        )
        }
      </div>
    </div>
  );
}
