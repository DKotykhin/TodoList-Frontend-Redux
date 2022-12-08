import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { GetAllTasks } from "api/taskrequests";
import { ITask } from "../types/taskTypes"

export const fetchTasks = createAsyncThunk(
    'task/fetch',
    async (token: string) => {
        const { data } = await GetAllTasks(token);
        return data
    }
);

interface ITaskdata {
    taskdata: ITask[];
    fetching: string
}

const initialState: ITaskdata = {
    taskdata: [],
    fetching: 'waiting'
};

const TasksSlice = createSlice({
    name: "task",
    initialState,
    reducers: {
        addTask: (state, action: PayloadAction<ITask>) => {
            state.taskdata = [...state.taskdata, action.payload];
        },
        removeTask: (state, action: PayloadAction<string>) => {
            const newTasks = state.taskdata.filter(
                (task) => task._id !== action.payload
            );
            state.taskdata = newTasks;
        },
        updateTaskCompleted: (state, action: PayloadAction<string>) => {
            state.taskdata.forEach((item) => {
                if (item._id === action.payload) {
                    item.completed = !item.completed
                }
            });
        },
        updateTaskAll: (state, action: PayloadAction<ITask>) => {
            state.taskdata.forEach((item) => {
                if (item._id === action.payload._id) {
                    item.description = action.payload.description
                    item.completed = action.payload.completed
                }
            });
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchTasks.pending, state => {
                state.taskdata = []
                state.fetching = 'loading'
            })
            .addCase(fetchTasks.fulfilled, (state, action: PayloadAction<ITask[]>) => {
                state.taskdata = action.payload
                state.fetching = 'loaded'
            })
            .addCase(fetchTasks.rejected, state => {
                state.taskdata = []
                state.fetching = 'error'
            })
            .addDefaultCase((state) => {
                state.taskdata = []
            })
    }
});

const { actions, reducer } = TasksSlice;

export default reducer;
export const {
    addTask,
    removeTask,
    updateTaskCompleted,
    updateTaskAll
} = actions;