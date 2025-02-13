import axios from 'axios';
import {createAsyncThunk} from "@reduxjs/toolkit";

const url = process.env.REACT_APP_BASE_URL;
const destinationUrl = process.env.REACT_APP_URL_GET_DESTINATION;

export const fetchDestinations = createAsyncThunk('destinations/fetchDestinations', async (_, {rejectWithError}) => {
    try {
        const response = await axios.get(url + destinationUrl);
        return response.data;
    }
    catch (e) {
        return rejectWithError(e.response?.data?.message || e.message);
    }
})