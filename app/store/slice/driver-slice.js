import {createReducer, createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import {endPoints, errorMessageTypes, socketActionTypes} from '../../constants';
import {rootClient, socket} from '../../utils';
import store from '../store';

const initialState = {
  loading: false,
  success: false,
  error_message: null,
  dl_loading: false,
  driver_photo_loading: false,
  driver_count: 0,
  driver: {
    dl_number: '',
    user_name: '',
    mobile_primary: '',
    mobile_secondary: '',
    dl_document: null,
    state: '',
    city: '',
    profile_pic: null,
    address: '',
    acc_number: '',
    ifsc_code: '',
    name_in_bank: '',
    upi: '',
  },
  drivers: {
    is_loading: false,
    is_more_loading: false,
    error_message: null,
    data: {
      drivers: [],
    },
  },
  // driver_trips_loading: false,
  driver_trips: {
    is_loading: false,
    is_more_loading: false,
    data: {
      trips: [],
    },
  },
  // driver_trip_loading: false,
  driver_trip: {},
};

export const getDriverCount = createAsyncThunk(
  'get-driver-count',
  async (arg, {rejectWithValue}) => {
    try {
      const response = await rootClient.get(endPoints.DRIVER_COUNT);
      console.log(response);
      return response;
    } catch (error) {
      return rejectWithValue(error);
    }
  },
);

export const getDrivers = createAsyncThunk(
  'get-drivers',
  async (arg = {}, {rejectWithValue}) => {
    // console.log(arg);
    const {page = 1, limit = 10, search = false, search_value = ''} = arg;
    const query = `?limit=${limit}&page=${page}&search=${search}&search_value=${search_value}`;
    // console.log(query);
    try {
      const response = await rootClient.get(endPoints.DRIVER + query);
      // console.log('----->>>>>>>>>>>>', response);
      return response;
    } catch (error) {
      return rejectWithValue(error);
    }
  },
);

export const createDriver = createAsyncThunk(
  'create-driver',
  async (arg, {getState, dispatch, rejectWithValue}) => {
    const {driver} = getState();
    try {
      const response = await rootClient.post(endPoints.DRIVER, driver.driver);
      return response;
    } catch (error) {
      return rejectWithValue(error);
    }
  },
);

export const deleteDriver = createAsyncThunk(
  'delete-driver',
  async (id, {rejectWithValue}) => {
    try {
      const response = await rootClient.delete(`${endPoints.DRIVER}/${id}`);
      return id;
    } catch (error) {
      return rejectWithValue(error);
    }
  },
);

export const uploadDriverDl = createAsyncThunk(
  'upload-dl-driver',
  async (uri, {rejectWithValue}) => {
    const formData = new FormData();
    formData.append('doc', {
      name: 'image.jpg',
      uri: uri,
      type: 'image/jpg',
    });
    try {
      const response = await rootClient.post(endPoints.DL, formData, {
        headers: {
          accept: 'application/json',
          'content-type': 'multipart/form-data',
        },
      });
      return response;
    } catch (error) {
      return rejectWithValue(error);
    }
  },
);
export const uploadDriverProfilePic = createAsyncThunk(
  'upload-driver-profile-pic',
  async (uri, {rejectWithValue}) => {
    const formData = new FormData();
    formData.append('doc', {
      name: 'image.jpg',
      uri: uri,
      type: 'image/jpg',
    });
    try {
      const response = await rootClient.post(
        endPoints.DRIVER_PROFILE_PIC,
        formData,
        {
          headers: {
            accept: 'application/json',
            'content-type': 'multipart/form-data',
          },
        },
      );
      return response;
    } catch (error) {
      return rejectWithValue(error);
    }
  },
);

export const getDriverTrips = createAsyncThunk(
  'get-driver-trips',
  async (arg = {}, {rejectWithValue}) => {
    const {page = 1, limit = 10, id} = arg;
    const query = `?driverID=${id}&limit=${limit}&page=${page}`;
    try {
      const response = await rootClient.get(endPoints.DRIVER_TRIPS + query);
      return response;
    } catch (error) {
      return rejectWithValue(error);
    }
  },
);

const driverSlice = createSlice({
  name: 'driver',
  initialState, /// when both key and value will we same don't need to pass value
  reducers: {
    setDriverUserName(state, action) {
      state.driver.user_name = action.payload;
    },
    setDriverDLNumber(state, action) {
      state.driver.dl_number = action.payload;
    },
    setDriverMobilePrimary(state, action) {
      state.driver.mobile_primary = action.payload;
    },
    setDriverMobileSecondary(state, action) {
      state.driver.mobile_secondary = action.payload;
    },
    setDriverAddress(state, action) {
      state.driver.address = action.payload;
    },
    setDriverDl(state, action) {
      state.driver.dl_document = action.payload;
    },
    setDriverIFSC(state, action) {
      state.driver.ifsc_code = action.payload;
    },
    setDriverAccountNumber(state, action) {
      state.driver.acc_number = action.payload;
    },
    setDriverNameInBank(state, action) {
      state.driver.name_in_bank = action.payload;
    },
    setDriverState(state, action) {
      state.driver.state = action.payload;
    },
    setDriverCity(state, action) {
      state.driver.city = action.payload;
    },
    getSingleTripDetail(state, action) {
      state.driver_trip = state.driver_trips.data.trips.find(
        item => item._id == action.payload,
      );
    },

    driverFormDataClear(state, action) {
      state.driver = {
        dl_number: '',
        user_name: '',
        mobile_primary: '',
        mobile_secondary: '',
        dl_document: null,
        profile_pic: null,
        address: '',
        acc_number: '',
        ifsc_code: '',
        name_in_bank: '',
        upi: '',
      };
    },
    driverStateClear: () => initialState,
  },
  extraReducers: {
    // get all loads -------------------------------------------------
    [getDrivers.fulfilled]: (state, action) => {
      let data = action.payload;
      if (data.page == 1 || data.page == undefined) {
        state.drivers.data = data;
        state.drivers.is_loading = false;
      } else {
        state.drivers.data.drivers = [
          ...state.drivers.data.drivers,
          ...data.drivers,
        ];
        state.drivers.is_more_loading = false;
      }
    },

    [getDrivers.pending]: (state, action) => {
      const {arg} = action.meta;
      state.drivers.error_message = null;
      if (arg && arg?.page >= 2) {
        state.drivers.is_more_loading = true;
      } else {
        state.drivers.is_loading = true;
      }
    },

    [getDrivers.rejected]: (state, action) => {
      state.drivers.error_message =
        action.payload.message || errorMessageTypes.DEFAULT_MESSAGE;
      state.drivers.is_loading = false;
      state.drivers.is_more_loading = false;
    },
    // create driver -------------------------------------------------
    [createDriver.fulfilled]: (state, action) => {
      const {driver} = action.payload;
      if (driver) {
        state.drivers.data.drivers = [driver, ...state.drivers.data.drivers];
        state.driver_count++;
      }
      state.loading = false;
    },

    [createDriver.pending]: (state, action) => {
      state.error_message = null;
      state.loading = true;
    },

    [createDriver.rejected]: (state, action) => {
      state.error_message =
        action.payload.message || errorMessageTypes.DEFAULT_MESSAGE;
      state.loading = false;
    },
    //  upload driver dl  --------------------
    [uploadDriverDl.fulfilled]: (state, action) => {
      const {path} = action.payload;
      state.driver.dl_document = path;
      state.loading = false;
      state.dl_loading = false;
    },

    [uploadDriverDl.pending]: (state, action) => {
      state.error_message = null;
      state.loading = true;
      state.dl_loading = true;
    },

    [uploadDriverDl.rejected]: (state, action) => {
      state.error_message =
        action.payload.message || errorMessageTypes.DEFAULT_MESSAGE;
      state.loading = false;
      state.dl_loading = false;
    },
    //  upload driver profile pic  --------------------
    [uploadDriverProfilePic.fulfilled]: (state, action) => {
      const {path} = action.payload;
      state.driver.profile_pic = path;
      state.loading = false;
      state.driver_photo_loading = false;
    },

    [uploadDriverProfilePic.pending]: (state, action) => {
      state.error_message = null;
      state.loading = true;
      state.driver_photo_loading = true;
    },

    [uploadDriverProfilePic.rejected]: (state, action) => {
      state.error_message =
        action.payload.message || errorMessageTypes.DEFAULT_MESSAGE;
      state.loading = false;
      state.driver_photo_loading = false;
    },
    // delete driver --------------------------------------
    [deleteDriver.fulfilled]: (state, {payload: id}) => {
      state.drivers = state.drivers.filter(item => item._id != id);
      state.loading = false;
    },
    [deleteDriver.pending]: (state, {payload: id}) => {
      state.error_message = null;
      state.loading = true;
    },

    [deleteDriver.rejected]: (state, action) => {
      state.error_message =
        action.payload.message || errorMessageTypes.DEFAULT_MESSAGE;
      state.loading = false;
    },
    // driver  count --------------------------------------
    [getDriverCount.fulfilled]: (state, action) => {
      state.driver_count = action.payload.count;
    },

    // get all driver trips -------------------------------------------------
    [getDriverTrips.fulfilled]: (state, action) => {
      let data = action.payload;
      if (data.page == 1 || data.page == undefined) {
        state.driver_trips.data = data;
        state.driver_trips.is_loading = false;
      } else {
        state.driver_trips.data.trips = [
          ...state.driver_trips.data.trips,
          ...data.trips,
        ];
        state.driver_trips.is_more_loading = false;
      }
    },

    [getDriverTrips.pending]: (state, action) => {
      const {arg} = action.meta;
      state.error_message = null;
      if (arg && arg?.page >= 2) {
        state.driver_trips.is_more_loading = true;
      } else {
        state.driver_trips.is_loading = true;
      }
    },

    [getDriverTrips.rejected]: (state, action) => {
      state.error_message =
        action.payload.message || errorMessageTypes.DEFAULT_MESSAGE;
      state.driver_trips.is_loading = false;
      state.driver_trips.is_more_loading = false;
    },
  },
});

socket.on(socketActionTypes.DRIVER_UPDATE, data => {
  store.dispatch(getDrivers());
});
export const {
  setDriverDLNumber,
  setDriverMobilePrimary,
  setDriverMobileSecondary,
  setDriverUserName,
  setDriverAddress,
  setDriverIFSC,
  setDriverAccountNumber,
  setDriverNameInBank,
  setDriverDl,
  getSingleTripDetail,
  driverStateClear,
  driverFormDataClear,
  setDriverCity,
  setDriverState,
} = driverSlice.actions;

export default driverSlice.reducer;
