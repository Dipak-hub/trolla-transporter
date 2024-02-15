import {createReducer, createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import {endPoints, errorMessageTypes, socketActionTypes} from '../../constants';
import {rootClient} from '../../utils';
import {socket} from './../../utils';
import store from './../store';

const initialState = {
  loading: false,
  error: false,
  errorMessage: 'error',
  area: [],
};

export const getArea = createAsyncThunk(
  'get-area',
  async (arg, {rejectWithValue}) => {
    try {
      const response = await rootClient.get(endPoints.AREA);
      return response;
    } catch (error) {
      return rejectWithValue(error);
    }
  },
);

const areaSlice = createSlice({
  name: 'area',
  initialState,
  reducers: {},
  extraReducers: {
    [getArea.fulfilled]: (state, action) => {
      state.area = action.payload.area;
      state.loading = false;
    },
    [getArea.pending]: (state, action) => {
      state.error_message = null;
      state.loading = true;
    },
    [getArea.rejected]: (state, action) => {
      state.error_message =
        action.payload.message || errorMessageTypes.DEFAULT_MESSAGE;
      state.loading = false;
    },
  },
});

export default areaSlice.reducer;
