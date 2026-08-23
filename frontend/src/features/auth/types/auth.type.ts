export interface LoginPayload {
  user: {
    email: string;
    password: string;
  }
}

export interface AuthUser {
  id: number;
  email: string;
}

export interface LoginResponse {
  user: AuthUser;
  accessToken: string;
}

export interface RefreshResponse {
  accessToken: string;
}
