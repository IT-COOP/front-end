import { configureStore } from "@reduxjs/toolkit";
import { logger } from "redux-logger";

import userSlice from "./redux/module/userSlice";

export const store = configureStore({
  reducer: {
    user: userSlice,
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({ serializableCheck: false }).concat(logger),
});
