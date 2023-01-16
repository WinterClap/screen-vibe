import React from "react";
import { useDispatch } from "react-redux";
import CategoryLayout from "../../../src/layouts/Category";
import MainLayout from "../../../src/layouts/Main";
import { setToastData } from "../../../src/slices/toastMessageSlice";
import { NextPageWithLayout } from "../../_app";
import useAuth from "../../../src/hooks/useAuth";
import MoviesContent from "../../../src/components/Pages/Movies/Content";

const MoviesPage: NextPageWithLayout = () => {
  const dispatch = useDispatch();
  useAuth();

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
      <MoviesContent />
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
