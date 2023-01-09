import { configureStore } from "@reduxjs/toolkit";
import { generalSlice } from "../slices/generalSlice";
import { toastMessageSlice } from "../slices/toastMessageSlice";
import { userSlice } from "../slices/userSlice";

export const store = configureStore({
  reducer: {
    general: generalSlice.reducer,
    toastMessage: toastMessageSlice.reducer,
    user: userSlice.reducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
