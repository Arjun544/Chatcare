import { configureStore } from "@reduxjs/toolkit";
import auth from "./reducers/authSlice";

export const store = configureStore({
  reducer: {auth},
})