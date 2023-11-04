import { configureStore } from "@reduxjs/toolkit";
import todoSliceReducer from "./Features/slices/dataStore";

const store = configureStore({
    reducer: {
        todoSlice: todoSliceReducer,
    }
});

export default store;