import {createReducer, createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import {endPoints, errorMessageTypes} from '../../constants';
import {rootClient} from '../../utils';

const initialState = {
  loading: false,
  error_message: null,
  material_types: [],
  vehicle_types: [],
};

export const getMaterialType = createAsyncThunk(
  'material',
  async (arg, {rejectWithValue}) => {
    try {
      const response = await rootClient.get(endPoints.MATERIAL_TYPES);
      return response;
    } catch (error) {
      return rejectWithValue(error);
    }
  },
);
export const getVehicleTypes = createAsyncThunk(
  'vehicle-types',
  async (arg, {rejectWithValue}) => {
    try {
      const response = await rootClient.get(endPoints.VEHICLE_TYPES);
      // console.log('response', response);
      return response;
    } catch (error) {
      return rejectWithValue(error);
    }
  },
);

const masterDbSlice = createSlice({
  name: 'master-db',
  initialState,
  reducers: {},
  extraReducers: {
    // material type----------------------------------
    [getMaterialType.fulfilled]: (state, action) => {
      state.material_types = action.payload.materials;
      state.loading = false;
    },

    [getMaterialType.pending]: (state, action) => {
      state.error_message = null;
      state.loading = true;
    },

    [getMaterialType.rejected]: (state, action) => {
      state.error_message =
        action.payload.message || errorMessageTypes.DEFAULT_MESSAGE;
      state.loading = false;
    },

    // vehicle type----------------------------------
    [getVehicleTypes.fulfilled]: (state, action) => {
      const {vehicle_types} = action.payload;
      state.vehicle_types = vehicle_types;
      state.loading = false;
    },

    [getVehicleTypes.pending]: (state, action) => {
      state.error_message = null;
      state.loading = true;
    },

    [getVehicleTypes.rejected]: (state, action) => {
      state.error_message =
        action.payload.message || errorMessageTypes.DEFAULT_MESSAGE;
      state.loading = false;
    },
  },
});

export const {} = masterDbSlice.actions;

export default masterDbSlice.reducer;
