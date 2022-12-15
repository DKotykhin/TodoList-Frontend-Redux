import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { GetAllTasks } from "api/taskrequests";
import { ITask } from "../types/taskTypes";

export const fetchTasks = createAsyncThunk(
    "task/fetch",
    async (_, { rejectWithValue }) => {
        try {
            const data = await GetAllTasks();
            return data;
        } catch (err: any) {
            return rejectWithValue(err.response.data.message);
        }
    }
);

interface ITaskdata {
    taskdata: ITask[];
    fetching: string;
    error: unknown;
}

const initialState: ITaskdata = {
    taskdata: [],
    fetching: "waiting",
    error: "",
};

const TasksSlice = createSlice({
    name: "task",
    initialState,
    reducers: {
        removeTask: (state, action: PayloadAction<string>) => {
            const newTasks = state.taskdata.filter(
                (task) => task._id !== action.payload
            );
            state.taskdata = newTasks;
        },
        updateTaskCompleted: (state, action: PayloadAction<string>) => {
            state.taskdata.forEach((item) => {
                if (item._id === action.payload) {
                    item.completed = !item.completed;
                }
            });
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchTasks.pending, (state) => {
                state.taskdata = [];
                state.fetching = "loading";
            })
            .addCase(
                fetchTasks.fulfilled,
                (state, action: PayloadAction<ITask[]>) => {
                    state.taskdata = action.payload;
                    state.fetching = "loaded";
                }
            )
            .addCase(
                fetchTasks.rejected,
                (state, action: PayloadAction<unknown>) => {
                    state.taskdata = [];
                    state.fetching = "error";
                    state.error = action.payload;
                }
            );
    },
});

const { actions, reducer } = TasksSlice;

export default reducer;
export const { removeTask, updateTaskCompleted } = actions;
