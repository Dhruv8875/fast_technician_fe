import { configureStore } from "@reduxjs/toolkit";
import technicianAuthReducer from "./redux/slices/auth/technicianAuthSlice";
import technicianRequestReducer from "./redux/slices/request/technicianRequestSlice";

export const store = configureStore({
  reducer: {
    technicianAuth: technicianAuthReducer,
    technicianRequests: technicianRequestReducer
  },
});
