import { configureStore } from '@reduxjs/toolkit';

import user from './userSlice';
import task from './taskSlice';

const store = configureStore({
    reducer: { user, task },
    devTools: process.env.NODE_ENV !== 'production'
});

export default store;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;