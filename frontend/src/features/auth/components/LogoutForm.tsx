import { useLogout } from "@/features/auth";

export function LogoutForm() {
  const logout = useLogout();

  const onSubmit = (event: React.SubmitEvent<HTMLFormElement>) => {
    event.preventDefault();
    logout.mutate();
  };

  return (
    <form onSubmit={onSubmit} method="post">
      <button
        type="submit"
        className="flex h-12 items-center justify-center rounded-full border border-solid border-black/[.08] px-8 text-base font-medium transition-colors hover:border-transparent hover:bg-black/[.04] dark:border-white/[.145] dark:hover:bg-[#1a1a1a]"
      >
        Log out
      </button>
    </form>
  )
}
