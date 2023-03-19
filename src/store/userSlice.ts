import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { IUser } from "types/userTypes";
import User from "api/userrequests";

export const fetchUserByToken = createAsyncThunk(
    "user/fetch",
    async (_, { rejectWithValue }) => {
        try {
            const data: IUser = await User.LoginUserByToken();
            console.log("login via token");
            return data;
        } catch (err: any) {
            return rejectWithValue(err.response.data.message || err.message);
        }
    }
);

interface IUserdata {
    userdata: IUser;
    fetching: string;
}
const emptyUser: IUser = {
    _id: "",
    email: "",
    name: "",
    createdAt: "",
    avatarURL: "",
    message: "",
};

const initialState: IUserdata = {
    userdata: emptyUser,
    fetching: "waiting",
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
        updateName: (state, action: PayloadAction<string>) => {
            state.userdata.name = action.payload;
        },
        removeUser: (state) => {
            state.userdata = emptyUser;
            state.fetching = "waiting";
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchUserByToken.pending, (state) => {
                state.userdata = emptyUser;
                state.fetching = "loading";
            })
            .addCase(
                fetchUserByToken.fulfilled,
                (state, action: PayloadAction<IUser>) => {
                    state.userdata = action.payload;
                    state.fetching = "loaded";
                }
            )
            .addCase(
                fetchUserByToken.rejected,
                (state, action: PayloadAction<unknown>) => {
                    state.userdata = emptyUser;
                    state.fetching = "error";
                    state.userdata.message = action.payload;
                }
            );
    },
});

const { actions, reducer } = UserSlice;

export default reducer;
export const { createUser, addAvatar, updateName, removeUser } = actions;
