import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export type ToastMessageSliceState = {
  shouldShowToastMessage: boolean;
  // type: "warning" | "danger" | "info" | "success",
  toastData: {
    duration: number;
    content: string;
    title: string | null;
    icon: "warning" | "danger" | "info" | "success" | null;
  } | null;
};

const initialState: ToastMessageSliceState = {
  shouldShowToastMessage: false,
  toastData: null,
};
export const toastMessageSlice = createSlice({
  name: "toastMessage",
  initialState,
  reducers: {
    dismissToastMessage: (state) => {
      state.shouldShowToastMessage = false;
      state.toastData = null;
    },
    setToastData: (
      state,
      action: PayloadAction<
        Omit<Partial<NonNullable<ToastMessageSliceState["toastData"]>>, "content"> & { content: string }
      >
    ) => {
      const defaultToastData = { duration: 5000, content: "", title: null, icon: null };
      state.shouldShowToastMessage = true;
      state.toastData = { ...defaultToastData, ...action.payload };
    },
  },
});

export const { dismissToastMessage, setToastData } = toastMessageSlice.actions;
