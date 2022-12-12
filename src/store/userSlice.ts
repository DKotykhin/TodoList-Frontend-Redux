import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IUser } from "types/userTypes";

interface IUserdata {
    userdata: {
        user: IUser;
    }
}

const initialState: IUserdata = {
    userdata: {        
        user: { _id: "", email: "", name: "", createdAt: "" },
    },
};

const UserSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        createUser: (state, action: PayloadAction<{user: IUser}>) => {
            state.userdata = action.payload;
        },
        removeUser: (state) => {
            state.userdata = {                
                user: { _id: "", email: "", name: "", createdAt: "" },
            };
        },
    },
});

const { actions, reducer } = UserSlice;

export default reducer;
export const { createUser, removeUser } = actions;
