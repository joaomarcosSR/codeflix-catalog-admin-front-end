import { Action, configureStore, ThunkAction } from "@reduxjs/toolkit";
import { apiSlice } from "../features/api/apiSlice";
import { castMembersApiSlice } from "../features/castmember/CastMemberSlice";
import { categoriesApiSlice } from "../features/categories/CategorySlice";

export const store = configureStore({
  reducer: {
    [apiSlice.reducerPath]: apiSlice.reducer,
    [categoriesApiSlice.reducerPath]: apiSlice.reducer,
    [castMembersApiSlice.reducerPath]: apiSlice.reducer,
  },

  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apiSlice.middleware),
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
