import { createSlice } from "@reduxjs/toolkit";
import {fetchDestinations} from "../thunks/destinationsThunk";

const initialState = {
    destinations: [],
    loading: false,
    error: "",
};

const destinationSlices = createSlice({
    name: "destination",
    initialState,
    extraReducers: (builder) => {
        builder
            //fetchDestinations
            .addCase(fetchDestinations.pending, (state) => {
                state.loading = true;
                state.error = "";
            })
            .addCase(fetchDestinations.fulfilled, (state, action) => {
                state.loading = false;
                state.destinations = action.payload;
                state.error = "";
            })
            .addCase(fetchDestinations.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });
    },
});

export default destinationSlices.reducer;