import Cookies from "js-cookie";

export const checkSession = (cookieName: string) => {
  const cookieValue = Cookies.get(cookieName);
  console.log(cookieValue);
  return cookieValue !== undefined && cookieValue !== null;
};
