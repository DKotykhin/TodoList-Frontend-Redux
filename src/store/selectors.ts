import type { RootState } from './store';

export const selectUser = (state: RootState) => state.user;
export const selectTask = (state: RootState) => state.task;