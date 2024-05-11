/* eslint-disable @typescript-eslint/no-explicit-any */
export interface IAuthUser {
  api_key: string;
  display_name: string;
  email: string;
  id: string;
  settings: any;
  usage: any;
  verified: boolean;
}

export interface AuthData {
  token: string;
  isLoggedIn: boolean;
  user: IAuthUser;
}

interface AuthResponse {
  data: AuthData | null;
  success: boolean;
  message: string | null;
  error: string | null;
}

export default AuthResponse;
