import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    theme: localStorage.getItem("theme") || "light",
};

const themeSlices = createSlice({
    name: "theme",
    initialState,
    reducers: {
        toggle: (state) => {
            state.theme = state.theme === "light" ? "dark" : "light";
            localStorage.setItem("theme", state.theme);
        },
    },
});

export const {toggle} = themeSlices.actions;
export default themeSlices.reducer;