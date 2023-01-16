import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { setToastData } from "../../slices/toastMessageSlice";
import { setAccountDetails } from "../../slices/userSlice";
import type { AccountDetailsData } from "../../../pages/api/account";
import type { RootState } from "../../store";

const useAuthWithSession = () => {
  const isLoggedIn = useSelector((state: RootState) => state.user.isLoggedIn);
  const dispatch = useDispatch();

  const getUserInfo = React.useCallback(
    async (session_id: string) => {
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
        return;
      }
      dispatch(setToastData({ content: "There was a problem logging you in" }));
    },
    [dispatch]
  );

  React.useEffect(() => {
    const session_id = localStorage.getItem("session_id");
    if (!session_id || isLoggedIn) return;

    getUserInfo(session_id);
  }, [getUserInfo, isLoggedIn]);
};

export default useAuthWithSession;
