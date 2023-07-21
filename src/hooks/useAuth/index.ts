import React from "react";
import { useRouter } from "next/router";
import { useDispatch } from "react-redux";
import { setShouldShowSplashScreen } from "../../slices/generalSlice";
import { setToastData } from "../../slices/toastMessageSlice";
import { setAccountDetails } from "../../slices/userSlice";
import type { AccountDetailsData } from "../../../pages/api/account";
import type { AuthenticationSessionNewData } from "../../../pages/api/authentication/session/new";

const useAuth = () => {
  const dispatch = useDispatch();
  const { query, replace } = useRouter();

  React.useEffect(() => {
    if (!query.request_token && !query.approved) return;
    dispatch(setShouldShowSplashScreen(true));
    const getUserInfo = async (session_id: string) => {
      const response = await fetch(
        "/api/account?" +
          new URLSearchParams({
            session_id,
          })
      );

      const json = (await response.json()) as AccountDetailsData;
      if ("username" in json) {
        console.log(json);
        dispatch(setAccountDetails(json));
        return json;
      }
      dispatch(setToastData({ content: "There was a problem logging you in", icon: "danger" }));
    };
    const getSession = async (request_token: string) => {
      try {
        const response = await fetch("/api/authentication/session/new", {
          headers: {
            "Content-Type": "application/json",
          },
          method: "POST",
          body: JSON.stringify({
            request_token,
          }),
        });
        const json = (await response.json()) as AuthenticationSessionNewData;
        if ("session_id" in json) {
          console.log(json);
          localStorage.setItem("session_id", json.session_id);
          console.log("Proceed to clean query params (?)");
          await replace(window.location.pathname, undefined, { shallow: true });
          const userInfo = await getUserInfo(json.session_id);
          dispatch(setShouldShowSplashScreen(false));
          if (userInfo) {
            dispatch(setToastData({ content: `Welcome back, ${userInfo.username}!`, icon: "success" }));
          }
        } else {
          dispatch(setShouldShowSplashScreen(false));
          dispatch(setToastData({ content: "There was a problem logging you in", icon: "danger" }));
          await replace(window.location.pathname, undefined, { shallow: true });
        }
      } catch (error) {
        console.log(error);
        dispatch(setShouldShowSplashScreen(false));
        dispatch(setToastData({ content: "There was a problem logging you in", icon: "danger" }));
      }
    };

    if (query.request_token && query.approved) {
      console.log("Proceeds to do POST /authentication/session/new");
      getSession(query.request_token as string);
    }
  }, [query.request_token, query.approved, replace, dispatch]);

  return;
};

export default useAuth;
