import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IUserWithToken } from "types/userTypes";

interface IUserdata {
    userdata: IUserWithToken;
}

const initialState: IUserdata = {
    userdata: {
        token: "",
        user: { _id: "", email: "", name: "", createdAt: "" },
    },
};

const UserSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        createUser: (state, action: PayloadAction<IUserWithToken>) => {
            state.userdata = action.payload;
        },
        removeUser: (state) => {
            state.userdata = {
                token: "",
                user: { _id: "", email: "", name: "", createdAt: "" },
            };
        },
    },
});

const { actions, reducer } = UserSlice;

export default reducer;
export const { createUser, removeUser } = actions;
