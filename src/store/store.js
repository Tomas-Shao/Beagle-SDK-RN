import {configureStore} from '@reduxjs/toolkit';
import postsSlice from '../slices/postsSlice';
import counterSlice from '../slices/countSlice';
import logger from 'redux-logger';

export default configureStore({
    reducer: {
        counter: counterSlice,
        posts: postsSlice.reducer,
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger)
});
