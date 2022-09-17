import { configureStore } from "@reduxjs/toolkit";
import { basketReducer, restaurantReducer } from "./features";
export const store = configureStore({
  reducer: {
    basket: basketReducer,
    restaurant: restaurantReducer,
  },
});
