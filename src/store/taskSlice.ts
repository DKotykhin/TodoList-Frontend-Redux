import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { GetAllTasks } from "api/taskrequests";
import { IGetTasksResponse } from "types/responseTypes";
import { IQueryData } from "types/taskTypes";

export const fetchTasks = createAsyncThunk(
    "task/fetch",
    async (queryData: IQueryData, { rejectWithValue }) => {
        try {
            const data: IGetTasksResponse = await GetAllTasks(queryData);
            return data;
        } catch (err: any) {
            return rejectWithValue(err.response.data.message || err.message);
        }
    }
);

interface ITaskdata {
    taskdata: IGetTasksResponse;
    fetching: string;
    error: unknown;
}

const emptyTask: IGetTasksResponse = {
    totalTasksQty: 0,
    totalPagesQty: 0,
    tasksOnPageQty: 0,
    tasks: [],
    message: "",
};

const initialState: ITaskdata = {
    taskdata: emptyTask,
    fetching: "waiting",
    error: "",
};

const TasksSlice = createSlice({
    name: "task",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchTasks.pending, (state) => {
                state.taskdata.tasks = [];
                state.fetching = "loading";
            })
            .addCase(
                fetchTasks.fulfilled,
                (state, action: PayloadAction<IGetTasksResponse>) => {
                    state.taskdata = action.payload;
                    state.fetching = "loaded";
                }
            )
            .addCase(
                fetchTasks.rejected,
                (state, action: PayloadAction<unknown>) => {
                    state.taskdata.tasks = [];
                    state.fetching = "error";
                    state.error = action.payload;
                }
            );
    },
});

export default TasksSlice.reducer;
