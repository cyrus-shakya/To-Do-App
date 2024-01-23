import { configureStore } from "@reduxjs/toolkit";
import postSlice from "./postSlice";

export const store = configureStore(
  {
    reducer: {
      post: postSlice,
    },
    
  },
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);
