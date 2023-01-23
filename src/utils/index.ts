export const getPxFromSize = (size: string) => {
  return parseInt(size.match(/\d+/)?.[0] as string) || 0;
};

export const getCookieValueFromName = (cookieName: string) => {
  return document.cookie
    .split("; ")
    .find((cookieSlice) => cookieSlice.startsWith(cookieName))
    ?.split("=")[1];
};

export const getSessionIdFromLocalStorage = () => {
  return localStorage.getItem("session_id");
};
