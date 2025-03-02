import axios from 'axios';

import {createAsyncThunk} from "@reduxjs/toolkit";

const url = process.env.REACT_APP_BASE_URL;
const userLoginUrl = process.env.REACT_APP_URL_USER_LOGIN;

export const registerUser = createAsyncThunk('user/register', async ({username, email, password, gender, age}, {rejectWithValue}) => {
    try {
        const response = await axios.post(url + "/register", { username, email, password, gender, age });

        return response.data;
    }
    catch (e) {
        return rejectWithValue(e.response?.data?.error || e.message) || 'Registration failed';
    }
})

export const loginUser = createAsyncThunk('user/login', async ({email, password}, {rejectWithValue, dispatch}) => {
    try {
        const response = await axios.post(url + userLoginUrl, { email, password });

        localStorage.setItem('token', response.data.token);

        dispatch(fetchUserProfile());

        return response.data;
    }
    catch (e) {
        return rejectWithValue(e.response?.data?.error || e.message) || 'Login failed';
    }
})

export const fetchUserProfile = createAsyncThunk('user/fetchProfile', async (_, { rejectWithValue }) => {
        try {
            const token = localStorage.getItem('token');

            const response = await axios.get(url + '/profile', {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });

            return response.data;
        } catch (e) {
            return rejectWithValue(e.response?.data?.error || e.message) || 'Profile fetch failed';
        }
    }
);