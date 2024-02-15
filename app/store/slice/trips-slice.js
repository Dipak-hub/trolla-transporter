import {createReducer, createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import {
  endPoints,
  errorMessageTypes,
  socketActionTypes,
  statusTypes,
} from '../../constants';
import {rootClient} from '../../utils';
import {socket} from './../../utils';
import store from './../store';

const initialState = {
  loading: false,
  error_message: null,

  pending_trips: {
    is_loading: false,
    is_more_loading: false,
    pending_trip: {},
    data: {
      trips: [],
    },
  },
  confirmed_trips: {
    is_loading: false,
    is_more_loading: false,
    confirmed_trip: {},
    is_trip_loading: false,
    is_set_vehicle_and_driver_loading: false,
    data: {
      trips: [],
    },
  },

  completed_trips: {
    is_loading: false,
    is_more_loading: false,
    completed_trip: {rating: 1},
    is_trip_loading: false,
    data: {
      trips: [],
    },
  },

  trips_info_loading: false,
  total_pending_amount: 0,
  total_earned_amount: 0,
};

export const getPendingTrips = createAsyncThunk(
  'get-pending-trips',
  async (arg = {}, {rejectWithValue}) => {
    const {page = 1, limit = 10} = arg;
    const query = `?limit=${limit}&page=${page}`;
    try {
      const response = await rootClient.get(endPoints.PENDING_TRIPS + query);
      return response;
    } catch (error) {
      return rejectWithValue(error);
    }
  },
);

export const getSinglePendingTrip = createAsyncThunk(
  'get-single-pending-trip',
  async ({booking_id, quotation_id}, {rejectWithValue}) => {
    const query = `?booking_id=${booking_id}&quotation_id=${quotation_id}`;
    try {
      const response = await rootClient.get(endPoints.PENDING_TRIPS + query);
      return response;
    } catch (error) {
      return rejectWithValue(error);
    }
  },
);

export const getConfirmedTrips = createAsyncThunk(
  'get-confirmed-trips',
  async (arg = {}, {rejectWithValue}) => {
    const {page = 1, limit = 10} = arg;
    const query = `?limit=${limit}&page=${page}`;
    try {
      const response = await rootClient.get(endPoints.CONFIRMED_TRIPS + query);
      return response;
    } catch (error) {
      return rejectWithValue(error);
    }
  },
);

export const getSingleConfirmedTrip = createAsyncThunk(
  'get-single-confirmed-trip',
  async (booking_id, {rejectWithValue}) => {
    if (!booking_id) {
      let error = 'Invalid booking ID';
      return rejectWithValue(error);
    }
    const query = `?booking_id=${booking_id}`;
    try {
      const response = await rootClient.get(endPoints.CONFIRMED_TRIPS + query);
      return response;
    } catch (error) {
      return rejectWithValue(error);
    }
  },
);

export const getTripsInfo = createAsyncThunk(
  'get-Trips-info',
  async (arg, {rejectWithValue}) => {
    try {
      const response = await rootClient.get(endPoints.TRIPS_INFO);
      return response;
    } catch (error) {
      return rejectWithValue(error);
    }
  },
);

export const getCompletedTrips = createAsyncThunk(
  'get-completed-trips',
  async (arg = {}, {rejectWithValue}) => {
    const {page = 1, limit = 10} = arg;
    const query = `?limit=${limit}&page=${page}`;
    try {
      const response = await rootClient.get(endPoints.COMPLETED_TRIPS + query);
      return response;
    } catch (error) {
      return rejectWithValue(error);
    }
  },
);

export const getSingleCompletedTrip = createAsyncThunk(
  'get-single-completed-trip',
  async (booking_id, {rejectWithValue}) => {
    if (!booking_id) {
      let error = 'Invalid booking ID';
      return rejectWithValue(error);
    }
    const query = `?booking_id=${booking_id}`;
    try {
      const response = await rootClient.get(endPoints.COMPLETED_TRIPS + query);
      return response;
    } catch (error) {
      return rejectWithValue(error);
    }
  },
);

// assign vehicle and driver to the trips -----------------------
export const setVehicleAndDriver = createAsyncThunk(
  'set-vehicle-and-driver-trips',
  async (booking_id, {getState, rejectWithValue}) => {
    const {trips} = getState();
    const {driver, vehicle, loader} = trips.confirmed_trips.confirmed_trip;

    try {
      const response = await rootClient.post(endPoints.ASSIGN_VEHICLE_DRIVER, {
        driver_id: driver._id,
        vehicle_id: vehicle._id,
        loader_id: loader._id,
        booking_id,
      });
      return booking_id;
    } catch (error) {
      return rejectWithValue(error);
    }
  },
);
export const removeVehicleAndDriver = createAsyncThunk(
  'remove-vehicle-and-driver-trips',
  async (booking_id, {getState, rejectWithValue}) => {
    const {trips} = getState();
    const {driver, vehicle, loader} = trips.confirmed_trips.confirmed_trip;
    try {
      const response = await rootClient.post(endPoints.REMOVE_VEHICLE_DRIVER, {
        driver_id: driver._id,
        vehicle_id: vehicle._id,
        loader_id: loader._id,
        booking_id,
      });
      return booking_id;
    } catch (error) {
      return rejectWithValue(error);
    }
  },
);

const tripsSlice = createSlice({
  name: 'trips',
  initialState,
  reducers: {
    setDriver(state, action) {
      state.confirmed_trips.confirmed_trip.driver = action.payload;
    },
    setVehicle(state, action) {
      state.confirmed_trips.confirmed_trip.vehicle = action.payload;
    },
    clearAssign(state, action) {
      state.confirmed_trips.confirmed_trip.vehicle = null;
      state.confirmed_trips.confirmed_trip.driver = null;
    },

    updateVehicleLocation(state, action) {
      const {gps, vehicle_id} = action.payload;
      if (state.confirmed_trips.confirmed_trip.vehicle._id === vehicle_id) {
        state.confirmed_trips.confirmed_trip.vehicle.gps = gps;
      }
    },
    updateTripStatus(state, action) {
      state.confirmed_trips.confirmed_trip.status = action.payload;
    },
    setRating(state, action) {
      state.completed_trips.rating = action.payload;
    },
    clearTrips: () => initialState,
  },
  extraReducers: {
    // get all pending trips -------------------------------------------------
    [getPendingTrips.fulfilled]: (state, action) => {
      let data = action.payload;
      if (data.page == 1 || data.page == undefined) {
        state.pending_trips.data = data;
        state.pending_trips.is_loading = false;
      } else {
        state.pending_trips.data.trips = [
          ...state.pending_trips.data.trips,
          ...data.trips,
        ];
        state.pending_trips.is_more_loading = false;
      }
    },

    [getPendingTrips.pending]: (state, action) => {
      const {arg} = action.meta;
      state.error_message = null;
      if (arg && arg?.page >= 2) {
        state.pending_trips.is_more_loading = true;
      } else {
        state.pending_trips.is_loading = true;
      }
    },

    [getPendingTrips.rejected]: (state, action) => {
      state.error_message =
        action.payload.message || errorMessageTypes.DEFAULT_MESSAGE;
      state.pending_trips.is_loading = false;
      state.pending_trips.is_more_loading = false;
    },

    // get single pending trip -------------------------------------------------
    [getSinglePendingTrip.fulfilled]: (state, action) => {
      const data = action.payload;
      state.pending_trips.pending_trip = data?.trips[0];
      state.pending_trips.is_trip_loading = false;
    },

    [getSinglePendingTrip.pending]: (state, action) => {
      state.pending_trips.is_trip_loading = true;
    },

    [getSinglePendingTrip.rejected]: (state, action) => {
      state.error_message =
        action.payload?.message || errorMessageTypes.DEFAULT_MESSAGE;
      state.pending_trips.is_trip_loading = false;
    },

    // get all confirmed trips -------------------------------------------------
    [getConfirmedTrips.fulfilled]: (state, action) => {
      const data = action.payload;
      if (data.page == 1 || data.page == undefined) {
        state.confirmed_trips.data = data;
        state.confirmed_trips.is_loading = false;
      } else {
        state.confirmed_trips.data.trips = [
          ...state.confirmed_trips.data.trips,
          ...data.trips,
        ];
        state.confirmed_trips.is_more_loading = false;
      }
    },

    [getConfirmedTrips.pending]: (state, action) => {
      const {arg} = action.meta;
      state.error_message = null;
      if (arg && arg?.page >= 2) {
        state.confirmed_trips.is_more_loading = true;
      } else {
        state.confirmed_trips.is_loading = true;
      }
    },

    [getConfirmedTrips.rejected]: (state, action) => {
      state.error_message =
        action.payload?.message || errorMessageTypes.DEFAULT_MESSAGE;
      state.confirmed_trips.is_loading = false;
      state.confirmed_trips.is_more_loading = false;
    },
    // get single confirmed trip -------------------------------------------------
    [getSingleConfirmedTrip.fulfilled]: (state, action) => {
      const data = action.payload;
      state.confirmed_trips.confirmed_trip = data?.trips[0];
      state.confirmed_trips.is_trip_loading = false;
    },

    [getSingleConfirmedTrip.pending]: (state, action) => {
      state.confirmed_trips.is_trip_loading = true;
    },

    [getSingleConfirmedTrip.rejected]: (state, action) => {
      state.error_message =
        action.payload?.message || errorMessageTypes.DEFAULT_MESSAGE;
      state.confirmed_trips.is_trip_loading = false;
    },

    // get all completed trips -------------------------------------------------
    [getCompletedTrips.fulfilled]: (state, action) => {
      const data = action.payload;
      if (data.page == 1 || data.page == undefined) {
        state.completed_trips.data = data;
        state.completed_trips.is_loading = false;
      } else {
        state.completed_trips.data.trips = [
          ...state.completed_trips.data.trips,
          ...data.trips,
        ];
        state.completed_trips.is_more_loading = false;
      }
    },

    [getCompletedTrips.pending]: (state, action) => {
      const {arg} = action.meta;
      state.error_message = null;
      if (arg && arg?.page >= 2) {
        state.completed_trips.is_more_loading = true;
      } else {
        state.completed_trips.is_loading = true;
      }
    },

    [getCompletedTrips.rejected]: (state, action) => {
      state.error_message =
        action.payload?.message || errorMessageTypes.DEFAULT_MESSAGE;
      state.completed_trips.is_loading = false;
      state.completed_trips.is_more_loading = false;
    },

    // get single completed trip -------------------------------------------------
    [getSingleCompletedTrip.fulfilled]: (state, action) => {
      const data = action.payload;
      state.completed_trips.completed_trip = data?.trips[0];
      state.completed_trips.is_trip_loading = false;
    },

    [getSingleCompletedTrip.pending]: (state, action) => {
      state.completed_trips.is_trip_loading = true;
    },

    [getSingleCompletedTrip.rejected]: (state, action) => {
      state.error_message =
        action.payload?.message || errorMessageTypes.DEFAULT_MESSAGE;
      state.completed_trips.is_trip_loading = false;
    },
    // get Trips Info -------------------------------------------------
    [getTripsInfo.fulfilled]: (state, action) => {
      state.total_pending_amount = action.payload.total_pending_amount;
      state.total_earned_amount = action.payload.total_earned_amount;
      state.trips_info_loading = false;
    },

    [getTripsInfo.pending]: (state, action) => {
      state.error_message = null;
      state.trips_info_loading = true;
    },

    [getTripsInfo.rejected]: (state, action) => {
      state.error_message =
        action.payload.message || errorMessageTypes.DEFAULT_MESSAGE;
      state.trips_info_loading = false;
    },

    // assign vehicle and driver to trip -------------------------------------------------
    [setVehicleAndDriver.fulfilled]: (state, {payload: id}) => {
      const vehicle = state.confirmed_trips.confirmed_trip.vehicle;
      const driver = state.confirmed_trips.confirmed_trip.driver;
      state.confirmed_trips.confirmed_trip.status = statusTypes.ASSIGNED;
      state.confirmed_trips.data.trips = state.confirmed_trips.data.trips.map(
        item =>
          item._id == id
            ? {...item, status: statusTypes.ASSIGNED, vehicle, driver}
            : item,
      );
      state.confirmed_trips.is_set_vehicle_and_driver_loading = false;
    },

    [setVehicleAndDriver.pending]: (state, action) => {
      state.error_message = null;
      state.confirmed_trips.is_set_vehicle_and_driver_loading = true;
    },
    [setVehicleAndDriver.rejected]: (state, action) => {
      state.error_message =
        action.payload?.message || errorMessageTypes.DEFAULT_MESSAGE;
      state.confirmed_trips.is_set_vehicle_and_driver_loading = false;
    },
    // remove vehicle and driver to trip -------------------------------------------------
    [removeVehicleAndDriver.fulfilled]: (state, action) => {
      const booking_id = action.payload;
      state.confirmed_trips.confirmed_trip.vehicle = undefined;
      state.confirmed_trips.confirmed_trip.driver = undefined;
      state.confirmed_trips.confirmed_trip.status = statusTypes.CONFIRMED;

      state.confirmed_trips.data.trips = state.confirmed_trips.data.trips.map(
        item =>
          item._id == booking_id
            ? {
                ...item,
                status: statusTypes.CONFIRMED,
                vehicle: null,
                driver: null,
              }
            : item,
      );

      state.confirmed_trips.is_set_vehicle_and_driver_loading = false;
    },
    [removeVehicleAndDriver.pending]: (state, action) => {
      state.error_message = null;
      state.confirmed_trips.is_set_vehicle_and_driver_loading = true;
    },
    [removeVehicleAndDriver.rejected]: (state, action) => {
      state.error_message =
        action.payload.message || errorMessageTypes.DEFAULT_MESSAGE;
      state.confirmed_trips.is_set_vehicle_and_driver_loading = false;
    },
  },
});

// web socket actions -------------------------------------------------------------------
socket.on(socketActionTypes.VEHICLE_LOCATION, obj => {
  store.dispatch(tripsSlice.actions.updateVehicleLocation(obj));
});
socket.on(socketActionTypes.BID_ACCEPT, data => {
  store.dispatch(getPendingTrips());
  store.dispatch(getConfirmedTrips());
});

socket.on(socketActionTypes.TRIP_STATUS, data => {
  store.dispatch(getConfirmedTrips());
  store.dispatch(getCompletedTrips());
});

export const {
  setDriver,
  setVehicle,
  updateTripStatus,
  setRating,
  clearTrips,
  clearAssign,
} = tripsSlice.actions;

export default tripsSlice.reducer;
