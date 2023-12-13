import { configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/query';
import { courseApi } from '../services/notes';

const store = configureStore({
    reducer: {
        [courseApi.reducerPath]: courseApi.reducer
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(
        [courseApi.middleware]
    )
});

setupListeners(store.dispatch);

export default store;