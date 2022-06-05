import {fetch} from 'react-native/Libraries/Network/fetch';
import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';

const loadMoviesApi = () => {
    fetch('https://pcw-api.iqiyi.com/search/recommend/list?channel_id=1&data_type=1&mode=11&page_id=2&ret_num=48').then((res) => res.json());
};

export const loadData = createAsyncThunk('movie/loadData', async () => {
    const res = await loadMoviesApi();
    // 此处的返回结果会在 .fulfilled中作为payload的值
    return res;
});

export const movieSlice = createSlice({
    name: 'movie',
    initialState: {
        list: [],
        totals: 0,
    },
    reducers: {
        loadDataEnd(state, {payload}) {
            state.list = payload;
            state.totals = payload.length;
        },
    },

    // 可以额外的触发其他slice中的数据关联改变
    extraReducers: {
        [loadData.fulfilled](state, {payload}) {
            state.list = payload.data.list;
        },

        [loadData.rejected](state, err) {
            console.log(err);
        },

        [loadData.pending](state) {
            console.log('pending....');
        },
    },
});

export const {loadDataEnd} = movieSlice.actions;
export default movieSlice.reducer;
