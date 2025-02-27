import { createSlice } from "@reduxjs/toolkit";
import {fetchHotels, bookHotel, updateBook, deleteBook, fetchHotel} from "../thunks/hotelsThunk";

const initialState = {
    hotels: [],
    hotel: {},
    loading: false,
    error: '',
};

const hotelSlices = createSlice({
    name: "hotel",
    initialState,
    extraReducers: (builder) => {
        builder
            //fetchHotels
            .addCase(fetchHotels.pending, (state) => {
                state.loading = true;
                state.error = '';
            })
            .addCase(fetchHotels.fulfilled, (state, action) => {
                state.loading = false;
                state.hotels = action.payload;
                state.error = '';
            })
            .addCase(fetchHotels.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            //bookHotel
            .addCase(bookHotel.pending, (state) => {
                state.loading = true;
                state.error = '';
            })
            .addCase(bookHotel.fulfilled, (state, action) => {
                state.loading = false;
                state.hotels.push(action.payload);
                state.error = '';
            })
            .addCase(bookHotel.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            //updateBook
            .addCase(updateBook.pending, (state) => {
                state.loading = true;
                state.error = '';
            })
            .addCase(updateBook.fulfilled, (state, action) => {
                state.loading = false;
                state.error = '';

                const index = state.hotels.findIndex((hotel) => hotel.id === action.payload.id);
                if (index !== -1) {
                    state.hotels[index] = action.payload;
                }
            })
            .addCase(updateBook.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            //deleteBook
            .addCase(deleteBook.pending, (state) => {
                state.loading = true;
                state.error = '';
            })
            .addCase(deleteBook.fulfilled, (state, action) => {
                state.loading = false;
                state.error = '';

                const index = state.hotels.findIndex((hotel) => hotel.id === action.payload.id);
                if (index !== -1) {
                    state.hotels.splice(index, 1);
                }
            })
            .addCase(deleteBook.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            //fetchHotel
            .addCase(fetchHotel.pending, (state) => {
                state.loading = true;
                state.error = '';
            })
            .addCase(fetchHotel.fulfilled, (state, action) => {
                state.loading = false;
                state.hotel = action.payload;
                state.error = '';
            })
            .addCase(fetchHotel.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
    },
});

export default hotelSlices.reducer;