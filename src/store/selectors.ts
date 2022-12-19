import type { RootState } from './store';

export const selectUser = (state: RootState) => state.user;
export const selectTask = (state: RootState) => state.task;
export const selectAuthSuccess = (state: RootState) => state.user.userdata._id;
export const selectAuthError = (state: RootState) => state.user.fetching === 'error';