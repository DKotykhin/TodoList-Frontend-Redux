import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { IUser } from "types/userTypes";
import { UserLoginByToken } from "api/userrequests";

export const fetchUser = createAsyncThunk(
    "user/fetch",
    async (_, { rejectWithValue }) => {
        try {
            const data = await UserLoginByToken();
            return data;
        } catch (err: any) {            
            return rejectWithValue(err.response.data.message);
        }
    }
);

interface IUserdata {
    userdata: IUser;
    fetching: string;
    error: unknown;
}
const emptyUser: IUser = {
    _id: "",
    email: "",
    name: "",
    createdAt: "",
    avatarURL: "",
};

const initialState: IUserdata = {
    userdata: emptyUser,
    fetching: "waiting",
    error: ''
};

const UserSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        createUser: (state, action: PayloadAction<IUser>) => {
            state.userdata = action.payload;
        },
        addAvatar: (state, action: PayloadAction<string>) => {
            state.userdata.avatarURL = action.payload;
        },
        removeUser: (state) => {
            state.userdata = emptyUser;
            state.fetching = "waiting";
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchUser.pending, (state) => {
                state.userdata = emptyUser;
                state.fetching = "loading";
            })
            .addCase(
                fetchUser.fulfilled,
                (state, action: PayloadAction<IUser>) => {
                    state.userdata = action.payload;
                    state.fetching = "loaded";
                }
            )
            .addCase(fetchUser.rejected, (state, action: PayloadAction<unknown>) => {
                state.userdata = emptyUser;
                state.fetching = "error";
                state.error = action.payload;                               
            });
    },
});

const { actions, reducer } = UserSlice;

export default reducer;
export const { createUser, addAvatar, removeUser } = actions;
