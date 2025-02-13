import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    isLogin: false,
};

const userSlices = createSlice({
    name: "user",
    initialState,
    reducers: {
        login: (state) => {
            state.isLogin = true;
        },
        logout: (state) => {
            state.isLogin = false;
        },
    },
});

export const {login, logout} = userSlices.actions;
export default userSlices.reducer;