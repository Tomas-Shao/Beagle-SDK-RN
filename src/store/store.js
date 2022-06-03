import {configureStore} from '@reduxjs/toolkit';
import postsSlice from '../slices/postsSlice';
import counterSlice from '../slices/countSlice';

export default configureStore({
    reducer: {
        counter: counterSlice,
        posts: postsSlice.reducer,
    },
});
