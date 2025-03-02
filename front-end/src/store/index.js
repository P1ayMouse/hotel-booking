import { configureStore } from "@reduxjs/toolkit";

import authReducer from "./slices/authSlices";
import hotelReducer from "./slices/hotelSlices";
import destinationReducer from "./slices/destinationSlices";
import themeReducer from "./slices/themeSlices";

export const store = configureStore({
    reducer: {
        auth: authReducer,
        hotel: hotelReducer,
        destination: destinationReducer,
        theme: themeReducer
    }
});
