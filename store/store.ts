import {configureStore} from '@reduxjs/toolkit';
import commonReducer from '../slices/CommonSlice';
import authorReducer from '../slices/AuthorSlice';
import noteReducer from '../slices/NoteSlice';

export const store = configureStore({
  reducer: {
    commonReducer,
    authorReducer,
    noteReducer
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
