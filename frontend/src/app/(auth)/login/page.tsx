import { LoginForm } from '@/features/auth'

export default function LoginPage() {
  return (
    <div className="flex flex-1 flex-col items-center justify-center bg-zinc-50 px-6 py-24 dark:bg-black">
      <div className="flex w-full max-w-sm flex-col items-center gap-8">
        <h1 className="text-2xl font-semibold tracking-tight text-black dark:text-zinc-50">
          Log in
        </h1>
        <LoginForm />
      </div>
    </div>
  )
}
