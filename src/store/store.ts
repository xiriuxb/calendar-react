import { configureStore } from "@reduxjs/toolkit";
import { authSlice, uiSlice, calendarSlice } from ".";

export const store = configureStore({
    reducer:{
        ui:uiSlice.reducer,
        calendar:calendarSlice.reducer,
        auth:authSlice.reducer
    },
    middleware: (curryGetDefaultMiddleware) => curryGetDefaultMiddleware({serializableCheck:false}),
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;