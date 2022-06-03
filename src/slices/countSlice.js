import {createSlice} from '@reduxjs/toolkit';

export const counterSlice = createSlice({
    name: 'counter',
    initialState: {
        count: 100,
        title: 'reduce toolkit title',
    },

    reducers: {
        increment(state, {payload}) {
            console.log(payload.step);
            console.log(state.count);
            state.count += payload.step;
        },
        decrement(state, {payload}) {
            console.log(state);
            console.log(state.count);
            state.count -= payload.step;
        },
    },
});

export const {increment, decrement} = counterSlice.actions;
export const asyncIncrement = (payload) => (dispatch) => {
    setTimeout(() => {
        dispatch(increment(payload));
    }, 2000);
};

export default counterSlice.reducer;
