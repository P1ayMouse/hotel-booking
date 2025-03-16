import { createSlice } from "@reduxjs/toolkit";
import {fetchUserProfile, loginUser, registerUser, toggleLikeHotel} from "../thunks/authThunk";

const initialState = {
    user: null,
    token: localStorage.getItem('token') || null,
    error: "",
    loading: true,
};

const authSlices = createSlice({
    name: "auth",
    initialState,
    reducers: {
        logout: (state) => {
            state.user = null;
            state.token = null;
            localStorage.removeItem('token');
        },
        clearError: (state) => {
            state.error = "";
        }
    },
    extraReducers: (builder) => {
        builder
            // login
            .addCase(loginUser.pending, (state) => {
                state.loading = true;
                state.error = '';
            })
            .addCase(loginUser.fulfilled, (state, action) => {
                state.loading = false;
                state.token = action.payload.token;
                state.error = '';
            })
            .addCase(loginUser.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            // fetchUserProfile
            .addCase(fetchUserProfile.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchUserProfile.fulfilled, (state, action) => {
                state.loading = false;
                state.user = action.payload;
            })
            .addCase(fetchUserProfile.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            // registerUser
            .addCase(registerUser.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(registerUser.fulfilled, (state) => {
                state.loading = false;
                state.error = null;
            })
            .addCase(registerUser.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            // toggleLikeHotel
            .addCase(toggleLikeHotel.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(toggleLikeHotel.fulfilled, (state, action) => {
                state.loading = false;
                state.user.likedHotels = action.payload.likedHotels;
                state.error = null;
            })
            .addCase(toggleLikeHotel.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });
    }
});

export const {logout, clearError} = authSlices.actions;
export default authSlices.reducer;