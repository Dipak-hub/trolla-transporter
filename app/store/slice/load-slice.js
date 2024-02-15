import {createReducer, createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import {endPoints, errorMessageTypes, socketActionTypes} from '../../constants';
import {rootClient} from '../../utils';
import {socket} from './../../utils';
import store from './../store';

const initialState = {
  loading: false,
  error: false,
  errorMessage: 'error',
  bid: {
    load_id: '',
    amount: '',
    delivery_date: '',
    checked: false,
  },
  loads: {
    is_loading: false,
    is_more_loading: false,
    error_message: null,
    data: {
      loads: [],
    },
  },
};

export const getLoads = createAsyncThunk(
  'get-loads',
  async (arg = {}, {rejectWithValue}) => {
    const {
      page = 1,
      limit = 10,
      search = false,
      pickup_address = '',
      delivery_address = '',
    } = arg;
    const query = `?limit=${limit}&page=${page}&search=${search}&pickup_address=${pickup_address}&delivery_address=${delivery_address}`;

    console.log(query);
    try {
      const response = await rootClient.get(`${endPoints.LOAD}${query}`);
      console.log('--------->', response);
      return response;
    } catch (error) {
      return rejectWithValue(error);
    }
  },
);

export const createBid = createAsyncThunk(
  'create-Bid',
  async (load_details, {getState, dispatch, rejectWithValue}) => {
    const {load} = getState();
    let {bid} = load;
    const {_id: load_id, loader: loader_id} = load_details;
    bid = {...bid, load_id, loader_id};
    try {
      const response = await rootClient.post(endPoints.BID, bid);
      console.log('----->,', response);
      return response;
    } catch (error) {
      return rejectWithValue(error);
    }
  },
);

const loadSlice = createSlice({
  name: 'load',
  initialState, /// when both key and value will we same don't need to pass value
  reducers: {
    setBidInitialValue(state, action) {
      const {amount, delivery_date, checked} = action.payload;
      state.bid.amount = amount;
      state.bid.delivery_date = delivery_date;
      state.bid.checked = checked;
    },
    setBidAmount(state, action) {
      state.bid.amount = action.payload;
    },
    setBidDeliveryDate(state, action) {
      state.bid.delivery_date = action.payload;
    },
    setBidChecked(state, action) {
      state.bid.checked = action.payload;
    },
    addNewLoad(state, action) {
      const {load, booking} = action.payload;
      const newLoad = {_id: booking._id, load};
      state.loads.data.loads = [newLoad, ...state.loads.data.loads];
    },
    clearLoad: () => initialState,
  },
  extraReducers: {
    // get all loads -------------------------------------------------
    [getLoads.fulfilled]: (state, action) => {
      let data = action.payload;
      if (data.page == 1 || data.page == undefined) {
        state.loads.data = data;
        state.loads.is_loading = false;
      } else {
        state.loads.data.loads = [...state.loads.data.loads, ...data.loads];
        state.loads.is_more_loading = false;
      }
    },

    [getLoads.pending]: (state, action) => {
      const {arg} = action.meta;
      state.loads.error_message = null;
      if (arg && arg?.page >= 2) {
        // console.log('more');
        state.loads.is_more_loading = true;
      } else {
        // console.log('first');
        state.loads.is_loading = true;
      }
    },

    [getLoads.rejected]: (state, action) => {
      state.loads.error_message =
        action.payload?.message || errorMessageTypes.DEFAULT_MESSAGE;
      state.loads.is_loading = false;
      state.loads.is_more_loading = false;
    },

    // create bid  -------------------------------------------------
    [createBid.fulfilled]: (state, action) => {
      const {load_id} = action.payload;
      state.loads.data.loads = state.loads.data.loads.filter(
        item => item.load._id != load_id,
      );
      state.loads.is_more_loading = false;
    },

    [createBid.pending]: (state, action) => {
      state.loads.error_message = null;
      state.loads.is_more_loading = true;
    },

    [createBid.rejected]: (state, action) => {
      state.loads.error_message =
        action.payload.message || errorMessageTypes.DEFAULT_MESSAGE;
      state.loads.is_more_loading = false;
    },
  },
});

socket.on(socketActionTypes.NEW_LOAD, load => {
  // store.dispatch(tripsSlice.actions.getConfirmedTrips());
  store.dispatch(loadSlice.actions.addNewLoad(load));
});

export const {
  setBidAmount,
  setBidChecked,
  setBidDeliveryDate,
  setBidInitialValue,
  clearLoad,
} = loadSlice.actions;

export default loadSlice.reducer;
