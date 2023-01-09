import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { AccountDetails } from "../../pages/api/account";

type UserSliceState = {
  isLoggedIn: boolean;
  accountDetails: AccountDetails | null;
  shouldShowLogoutModal: boolean;
};

const initialState: UserSliceState = {
  isLoggedIn: false,
  accountDetails: null,
  shouldShowLogoutModal: false,
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    resetAccountDetails: () => {
      return initialState;
    },
    setAccountDetails: (state, action: PayloadAction<NonNullable<UserSliceState["accountDetails"]>>) => {
      state.isLoggedIn = true;
      state.accountDetails = action.payload;
    },
    setShouldShowLogoutModal: (state, action: PayloadAction<boolean>) => {
      state.shouldShowLogoutModal = action.payload;
    },
  },
});

export const { setAccountDetails, resetAccountDetails, setShouldShowLogoutModal } = userSlice.actions;
