import React from "react";
import { useRouter } from "next/router";
import { useDispatch } from "react-redux";
import CategoryLayout from "../../../src/layouts/Category";
import MainLayout from "../../../src/layouts/Main";
import { setToastData } from "../../../src/slices/toastMessageSlice";
import { NextPageWithLayout } from "../../_app";
import { setAccountDetails } from "../../../src/slices/userSlice";
import type { AuthenticationSessionNewData } from "../../api/authentication/session/new";
import type { AccountDetailsData } from "../../api/account";
import { setShouldShowSplashScreen } from "../../../src/slices/generalSlice";

const MoviesPage: NextPageWithLayout = () => {
  const dispatch = useDispatch();
  const { query, replace } = useRouter();
  console.log("query: ", query);

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

  return (
    <div>
      MoviesPage
      <button
        onClick={() => {
          dispatch(setToastData({ content: "content sample", title: "sample title" }));
        }}
      >
        set Toast data with title
      </button>
      <button
        onClick={() => {
          dispatch(setToastData({ content: "content sample" }));
        }}
      >
        set Toast data without title
      </button>
      <button
        onClick={() => {
          dispatch(setToastData({ content: "content sample", icon: "danger" }));
        }}
      >
        set Toast data type ERROR - DANGER
      </button>
      <button
        onClick={() => {
          dispatch(setToastData({ content: "content sample", icon: "warning" }));
        }}
      >
        set Toast data type WARNING
      </button>
      <button
        onClick={() => {
          dispatch(setToastData({ content: "content sample", icon: "info" }));
        }}
      >
        set Toast data type info
      </button>
      <button
        onClick={() => {
          dispatch(
            setToastData({
              content:
                "content sample as {toastData: NonNullable<ToastMessageSliceState[toastData]>} as {toastData: NonNullable<ToastMessageSliceState[toastData]>} as {toastData: NonNullable<ToastMessageSliceState[toastData]>} as {toastData: NonNullable<ToastMessageSliceState[toastData]>}",
              title: "sample title",
              duration: 30000,
            })
          );
        }}
      >
        set Toast data with huge content
      </button>
    </div>
  );
};

MoviesPage.getLayout = (page) => {
  return (
    <MainLayout>
      <CategoryLayout>{page}</CategoryLayout>
    </MainLayout>
  );
};

export default MoviesPage;
