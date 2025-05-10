import axios from "axios";
import {createAsyncThunk} from "@reduxjs/toolkit";

const url = process.env.REACT_APP_BASE_URL;
const hotelGetUrl = process.env.REACT_APP_URL_GET_HOTELS;
const hotelPostUrl = process.env.REACT_APP_URL_POST_HOTELS;

export const fetchHotels = createAsyncThunk("hotels/fetchHotels", async (_, {rejectWithError}) => {
    try {
        const response = await axios.get(url + hotelGetUrl);

        return response.data;
    }
    catch (e) {
        return rejectWithError(e.response?.data?.message || e.message);
    }
});

export const bookHotel = createAsyncThunk("hotels/bookHotels", async (newBook, {rejectWithError}) => {
    try {
        const response = await axios.post(url + hotelPostUrl, newBook, {
            headers: { "Content-Type": "application/json" },
        });

        return response.data;
    }
    catch (e) {
        return rejectWithError(e.message);
    }
});

export const updateBook = createAsyncThunk("hotels/updateBook", async (updatedBook, {rejectWithError}) => {
    try {
        const response = await axios.put(`${url + hotelPostUrl}/${updatedBook.id}`, updatedBook);

        return response.data;
    }
    catch (e) {
        return rejectWithError(e.message);
    }
});

export const deleteBook = createAsyncThunk("hotels/deleteBook", async (bookId, {rejectWithError}) => {
    try {
        await axios.delete(`${url + hotelPostUrl}/${bookId}`);

        return bookId;
    }
    catch (e) {
        return rejectWithError(e.message);
    }
});

export const fetchHotel = createAsyncThunk("hotels/hotel", async (id, {rejectWithValue}) => {
    try {
        const response = await axios.get(`${url + hotelGetUrl}/hotel/${id}`);

        return response.data;
    }
    catch (e) {
        return rejectWithValue(e.response?.data?.error || e.message);
    }
});
