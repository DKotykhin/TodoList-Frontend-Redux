import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { GetAllTasks } from "api/taskrequests";
import { ITaskResponse } from "types/responseTypes";

interface IQueryData {
    limit: number;
    page: number
}

export const fetchTasks = createAsyncThunk(
    "task/fetch",
    async (queryData: IQueryData, { rejectWithValue }) => {
        try {
            const data: ITaskResponse = await GetAllTasks(queryData);
            return data;
        } catch (err: any) {
            return rejectWithValue(err.response.data.message || err.message);
        }
    }
);

interface ITaskdata {
    taskdata: ITaskResponse;
    fetching: string;
    error: unknown;
}

const emptyTask: ITaskResponse = {
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
    reducers: {
        removeTask: (state, action: PayloadAction<string>) => {
            const newTasks = state.taskdata.tasks.filter(
                (task) => task._id !== action.payload
            );
            state.taskdata.tasks = newTasks;
        },
        updateTaskCompleted: (state, action: PayloadAction<string>) => {
            state.taskdata.tasks.forEach((item) => {
                if (item._id === action.payload) {
                    item.completed = !item.completed;
                }
            });
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchTasks.pending, (state) => {
                state.taskdata.tasks = [];
                state.fetching = "loading";
            })
            .addCase(
                fetchTasks.fulfilled,
                (state, action: PayloadAction<ITaskResponse>) => {
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

const { actions, reducer } = TasksSlice;

export default reducer;
export const { removeTask, updateTaskCompleted } = actions;
