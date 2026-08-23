import { authService } from "./auth.service";
import { tokenService } from "./token.service";
import { LoginPayload } from "@/features/auth";

let refreshPromise: Promise<string> | null = null;

function clear() {
  tokenService.clearAccessToken();
}

async function initialize() {
  const accessToken = tokenService.getAccessToken();

  try {
    if (!accessToken) {
      await refresh();
    }

    return await getMe();
  } catch (error) {
    console.error("[authSessionService] Failed to initialize session", error);
    clear();

    return null;
  }
}

async function getMe() {
  return authService.me();
}

async function login(payload: LoginPayload) {
  const data = await authService.login(payload);

  tokenService.setAccessToken(data.accessToken);

  return data.user;
}

async function logout() {
  try {
    await authService.logout();
  } finally {
    clear();
  }
}

async function refresh(): Promise<string> {
  if (refreshPromise) {
    return refreshPromise;
  }

  refreshPromise = authService
    .refresh()
    .then((data) => {
      tokenService.setAccessToken(data.accessToken);

      return data.accessToken;
    })
    .finally(() => {
      refreshPromise = null;
    });

  return refreshPromise;
}

export const authSessionService = {
  initialize,
  login,
  logout,
  refresh,
  getMe,
  clear,
};
