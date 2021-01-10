import { configureStore } from '@reduxjs/toolkit';
import taskSliceReducer from '../taskSlice';

const store = configureStore({
    reducer: {
        taskSliceReducer
    }
})

export default store;