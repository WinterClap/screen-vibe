import React from "react";
import { useDispatch } from "react-redux";
import type { AccountDetailsData } from "../../../pages/api/account";
import { setToastData } from "../../slices/toastMessageSlice";
import { setAccountDetails } from "../../slices/userSlice";

const useAuthWithSession = () => {
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
    if (!session_id) return;

    getUserInfo(session_id);
  }, [getUserInfo]);
};

export default useAuthWithSession;
