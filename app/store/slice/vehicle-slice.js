import {createReducer, createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import {endPoints, errorMessageTypes, socketActionTypes} from '../../constants';
import {rootClient, socket} from '../../utils';

const initialState = {
  loading: false,
  error_message: null,
  vehicle_rc_loading: false,
  vehicle_photo_loading: false,
  owner_pancard_loading: false,
  vehicle_count: 0,
  vehicle: {
    rc_number: '',
    owner_name: '',
    vehicle_type: '',
    load_capacity: '',
    body_type: 'Open',
    rc_document: null,
    vehicle_image: null,
    owner_pancard_image: null,
  },
  vehicles: {
    is_loading: false,
    is_more_loading: false,
    error_message: null,
    data: {
      drivers: [],
    },
  },
};

export const getVehicleCount = createAsyncThunk(
  'get-vehicles-count',
  async (arg, {rejectWithValue}) => {
    try {
      const response = await rootClient.get(endPoints.VEHICLE_COUNT);
      return response;
    } catch (error) {
      return rejectWithValue(error);
    }
  },
);

export const getVehicles = createAsyncThunk(
  'get-vehicles',
  async (arg = {}, {rejectWithValue}) => {
    const {page = 1, limit = 10, search = false, search_value = ''} = arg;
    const query = `?limit=${limit}&page=${page}&search=${search}&search_value=${search_value}`;
    try {
      const response = await rootClient.get(endPoints.VEHICLE + query);
      return response;
    } catch (error) {
      return rejectWithValue(error);
    }
  },
);

export const createVehicle = createAsyncThunk(
  'create-vehicle',
  async (arg, {getState, dispatch, rejectWithValue}) => {
    const {vehicle} = getState();
    try {
      const response = await rootClient.post(
        endPoints.VEHICLE,
        vehicle.vehicle,
      );
      return response;
    } catch (error) {
      return rejectWithValue(error);
    }
  },
);

export const deleteVehicle = createAsyncThunk(
  'delete-vehicle',
  async (id, {rejectWithValue}) => {
    try {
      const response = await rootClient.delete(`${endPoints.VEHICLE}/${id}`);
      return id;
    } catch (error) {
      return rejectWithValue(error);
    }
  },
);

export const uploadVehicleRcDocument = createAsyncThunk(
  'upload-vehicle-rc',
  async (uri, {rejectWithValue}) => {
    const formData = new FormData();
    formData.append('doc', {
      name: 'image.jpg',
      uri: uri,
      type: 'image/jpg',
    });
    try {
      const response = await rootClient.post(
        endPoints.REGISTRATION_CERTIFICATE,
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

export const uploadVehicleImage = createAsyncThunk(
  'upload-vehicle-image',
  async (uri, {rejectWithValue}) => {
    const formData = new FormData();
    formData.append('doc', {
      name: 'image.jpg',
      uri: uri,
      type: 'image/jpg',
    });
    try {
      const response = await rootClient.post(
        endPoints.VEHICLE_IMAGE,
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

export const uploadOwnerPancard = createAsyncThunk(
  'upload-owner-pancard',
  async (uri, {rejectWithValue}) => {
    const formData = new FormData();

    formData.append('doc', {
      name: 'image.jpg',
      uri: uri,
      type: 'image/jpg',
    });

    try {
      const response = await rootClient.post(
        endPoints.VEHICLE_OWNER_PAN,
        formData,
        {
          headers: {
            accept: 'application/json',
            'content-type': 'multipart/form-data',
          },
        },
      );
      console.log(response);
    } catch (error) {
      return rejectWithValue(error);
    }
  },
);

const vehicleSlice = createSlice({
  name: 'vehicle',
  initialState,
  reducers: {
    setVehicleRCNumber(state, action) {
      state.vehicle.rc_number = action.payload;
    },
    setVehicleOwnerName(state, action) {
      state.vehicle.owner_name = action.payload;
    },
    setVehicleType(state, action) {
      const {vehicle_type, capacity} = action.payload;
      state.vehicle.vehicle_type = vehicle_type;
      state.vehicle.load_capacity = capacity;
    },
    setVehicleLoadCapacity(state, action) {
      state.vehicle.load_capacity = action.payload;
    },
    setVehicleBodyType(state, action) {
      state.vehicle.body_type = action.payload;
    },
    setVehicleRcDocument(state, action) {
      state.vehicle.rc_document = action.payload;
    },
    setVehicleImage(state, action) {
      state.vehicle.vehicle_image = action.payload;
    },
    vehicleFormDataClear(state, action) {
      state.vehicle = {
        rc_number: '',
        owner_name: '',
        wheels: '',
        load_capacity: '',
        body_type: '',
        rc_document: null,
        vehicle_image: null,
      };
    },
    vehicleStateClear: () => initialState,
  },
  extraReducers: {
    // get all loads -------------------------------------------------
    [getVehicles.fulfilled]: (state, action) => {
      let data = action.payload;
      if (data.page == 1 || data.page == undefined) {
        state.vehicles.data = data;
        state.vehicles.is_loading = false;
      } else {
        state.vehicles.data.vehicles = [
          ...state.vehicles.data.vehicles,
          ...data.vehicles,
        ];
        state.vehicles.is_more_loading = false;
      }
    },

    [getVehicles.pending]: (state, action) => {
      const {arg} = action.meta;
      state.vehicles.error_message = null;
      if (arg && arg?.page >= 2) {
        state.vehicles.is_more_loading = true;
      } else {
        state.vehicles.is_loading = true;
      }
    },

    [getVehicles.rejected]: (state, action) => {
      state.vehicles.error_message =
        action.payload.message || errorMessageTypes.DEFAULT_MESSAGE;
      state.vehicles.is_loading = false;
      state.vehicles.is_more_loading = false;
    },
    // create driver -------------------------------------------------
    [createVehicle.fulfilled]: (state, action) => {
      const {vehicle} = action.payload;
      state.vehicles = [vehicle, ...state.vehicles];
      state.vehicle_count++;
      state.loading = false;
    },

    [createVehicle.pending]: (state, action) => {
      state.error_message = null;
      state.loading = true;
    },

    [createVehicle.rejected]: (state, action) => {
      state.error_message =
        action.payload.message || errorMessageTypes.DEFAULT_MESSAGE;
      state.loading = false;
    },
    //  upload rc   --------------------
    [uploadVehicleRcDocument.fulfilled]: (state, action) => {
      state.vehicle.rc_document = action.payload.path;
      state.loading = false;
      state.vehicle_rc_loading = false;
    },

    [uploadVehicleRcDocument.pending]: (state, action) => {
      state.error_message = null;
      state.loading = true;
      state.vehicle_rc_loading = true;
    },

    [uploadVehicleRcDocument.rejected]: (state, action) => {
      state.error_message =
        action.payload.message || errorMessageTypes.DEFAULT_MESSAGE;
      state.loading = false;
      state.vehicle_rc_loading = false;
    },
    //  upload vehicle image  --------------------
    [uploadVehicleImage.fulfilled]: (state, action) => {
      state.vehicle.vehicle_image = action.payload.path;
      state.loading = false;
      state.vehicle_photo_loading = false;
    },
    [uploadVehicleImage.pending]: (state, action) => {
      state.error_message = null;
      state.loading = true;
      state.vehicle_photo_loading = true;
    },
    [uploadVehicleImage.rejected]: (state, action) => {
      state.error_message =
        action.payload.message || errorMessageTypes.DEFAULT_MESSAGE;
      state.loading = false;
      state.vehicle_photo_loading = false;
    },
    // delete driver --------------------------------------
    [deleteVehicle.fulfilled]: (state, {payload: id}) => {
      state.vehicles = state.vehicles.filter(item => item._id != id);
      state.loading = false;
    },
    [deleteVehicle.pending]: (state, {payload: id}) => {
      state.error_message = null;
      state.loading = true;
    },

    [deleteVehicle.rejected]: (state, action) => {
      state.error_message =
        action.payload.message || errorMessageTypes.DEFAULT_MESSAGE;
      state.loading = false;
    },
    // delete driver --------------------------------------
    [getVehicleCount.fulfilled]: (state, action) => {
      state.vehicle_count = action.payload.count;
    },

    [uploadOwnerPancard.pending]: (state, action) => {
      state.owner_pancard_loading = true;
      state.error_message = null;
    },
    [uploadOwnerPancard.fulfilled]: (state, action) => {
      (state.owner_pancard_image = action.payload),
        (state.owner_pancard_loading = false);
      state.error_message = null;
    },
    [uploadOwnerPancard.rejected]: (state, action) => {
      state.error_message = errorMessageTypes.DEFAULT_MESSAGE;
      state.owner_pancard_loading = false;
    },
  },
});

socket.on(socketActionTypes.VEHICLE_UPDATE, data => {
  // console.log('first');
  store.dispatch(getVehicles());
});

export const {
  setVehicleBodyType,
  setVehicleImage,
  setVehicleLoadCapacity,
  setVehicleOwnerName,
  setVehicleRCNumber,
  setVehicleType,
  setVehicleRcDocument,
  vehicleFormDataClear,
  vehicleStateClear,
} = vehicleSlice.actions;

export default vehicleSlice.reducer;
