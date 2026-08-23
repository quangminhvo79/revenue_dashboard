'use client'

import Link from "next/link";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useLogin } from "@/features/auth";
import {
  loginSchema,
  type LoginFormValues,
} from "@/features/auth";

export function LoginForm() {
  const login = useLogin();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = (data: LoginFormValues) => {
    login.mutate({user: data});
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex w-full max-w-sm flex-col gap-4">
      {login.isError && (
        <p>
          Unable to login. Please check your email and password.
        </p>
      )}
      <div className="flex flex-col gap-1.5">
        <label
          htmlFor="email"
          className="text-sm font-medium text-zinc-700 dark:text-zinc-300"
        >
          Email
        </label>
        <input
          id="email"
          type="email"
          required
          placeholder="admin@example.com"
          className="rounded-md border border-black/[.08] bg-white px-3 py-2 text-sm text-black outline-none focus:border-zinc-400 dark:border-white/[.145] dark:bg-black dark:text-zinc-50"
          {...register("email")}
        />
        {errors.email && (
          <p className="text-sm text-red-600 dark:text-red-400">{errors.email.message}</p>
        )}
      </div>

      <div className="flex flex-col gap-1.5">
        <label
          htmlFor="password"
          className="text-sm font-medium text-zinc-700 dark:text-zinc-300"
        >
          Password
        </label>
        <input
          id="password"
          type="password"
          required
          className="rounded-md border border-black/[.08] bg-white px-3 py-2 text-sm text-black outline-none focus:border-zinc-400 dark:border-white/[.145] dark:bg-black dark:text-zinc-50"
          {...register("password")}
        />
        {errors.password && (
          <p className="text-sm text-red-600 dark:text-red-400">{errors.password.message}</p>
        )}
      </div>

      <button
        type="submit"
        disabled={login.isPending}
        className="mt-2 flex h-11 w-full items-center justify-center rounded-full bg-foreground px-5 text-sm font-medium text-background transition-colors hover:bg-[#383838] disabled:opacity-60 dark:hover:bg-[#ccc]"
      >
        {login.isPending ? 'Logging in...' : 'Log in'}
      </button>

      <Link
        className="mt-2 flex h-11 w-full items-center justify-center rounded-full bg-background px-5 text-sm font-medium text-foreground border border-black transition-colors hover:bg-foreground hover:text-background disabled:opacity-60 dark:hover:bg-[#ccc]"
        href="/"
      >
        Homepage
      </Link>

      <p className="text-center text-xs text-zinc-500 dark:text-zinc-400">
        Demo account: admin@example.com / password123
      </p>
    </form>
  )
}
