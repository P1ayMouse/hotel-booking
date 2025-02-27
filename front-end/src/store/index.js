import {configureStore } from "@reduxjs/toolkit";
import userReducer from "./slices/userSlices";
import hotelReducer from "./slices/hotelSlices";
import destinationReducer from "./slices/destinationSlices";
import themeReducer from "./slices/themeSlices";

export const store = configureStore({
    reducer: {
        user: userReducer,
        hotel: hotelReducer,
        destination: destinationReducer,
        theme: themeReducer
    }
});
