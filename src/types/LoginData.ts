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

interface LoginData {
  token: string;
  user: ILoginUser;
}

export default LoginData;
