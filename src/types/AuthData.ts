/* eslint-disable @typescript-eslint/no-explicit-any */
export interface ILoginUser {
  api_key: string;
  display_name: string;
  email: string;
  id: string;
  settings: any;
  usage: any;
  verified: boolean;
}

interface AuthData {
  token: string;
  isLoggedIn: boolean;
  user: ILoginUser;
}

export default AuthData;
