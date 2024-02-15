import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import {rootClient, otpGenerator} from '../../utils';
import {endPoints, errorMessageTypes} from '../../constants';

const initialState = {
  accessToken: '',
  refreshToken: '',
  loading: false,
  otp_sent: false,
  error_message: false,
  success: false,
};

export const login = createAsyncThunk(
  'user-login',
  async (body, {rejectWithValue}) => {
    try {
      const response = await rootClient.post(endPoints.LOGIN, body);
      return response;
    } catch (error) {
      return rejectWithValue(error);
    }
  },
);
export const logout = createAsyncThunk(
  'user-logout',
  async (body, {rejectWithValue, getState}) => {
    const {user} = getState();
    try {
      const response = await rootClient.post(endPoints.LOGOUT, {
        user_id: user.user._id,
      });
      console.log('respon--', response);
      return response;
    } catch (error) {
      return rejectWithValue(error);
    }
  },
);

export const sendOtp = createAsyncThunk(
  'send-otp',
  async (mobile_number, {rejectWithValue}) => {
    const body = {mobile_number, user_type: 'transporter'};
    try {
      const response = await rootClient.post(endPoints.OTP, body);

      return response;
    } catch (error) {
      return rejectWithValue(error);
    }
  },
);

const authSlice = createSlice({
  name: 'user-auth',
  initialState,
  reducers: {
    authStateClear: () => initialState,
    authStateError(state, action) {
      state.error_message = action.payload;
      state.goBack = false;
      state.error_message = null;
    },
  },
  extraReducers: {
    [login.fulfilled]: (state, action) => {
      const {accessToken, refreshToken} = action.payload;
      state.accessToken = accessToken;
      state.refreshToken = refreshToken;
      state.success = true;
    },
    [login.pending]: (state, action) => {
      state.loading = true;
      state.error_message = null;
    },
    [login.rejected]: (state, action) => {
      // if (action?.payload?.message) {
      //   state.errorMessage = action?.payload?.message;
      // } else {
      //   state.error = true;
      // }
      state.success = false;
      state.error_message =
        action.payload.message || errorMessageTypes.DEFAULT_MESSAGE;
      state.loading = false;
    },
    [logout.fulfilled]: (state, action) => {
      console.log('success', action.payload);
      state.success = false;
      state.loading = false;
    },
    [logout.pending]: (state, action) => {
      state.loading = true;
      state.error_message = null;
    },
    [logout.rejected]: (state, action) => {
      // state.success = false;
      console.log('rej', action.payload.message);
      // state.error_message =
      //   action.payload.message || errorMessageTypes.DEFAULT_MESSAGE;
      state.loading = false;
    },
    //  send otp --------------------------
    [sendOtp.fulfilled]: (state, action) => {
      const {success} = action.payload;
      if (success) {
        state.otp_sent = true;
      } else {
        state.otp_sent = false;
      }
      state.loading = false;
    },

    [sendOtp.pending]: (state, action) => {
      state.loading = true;
      state.error_message = null;
    },

    [sendOtp.rejected]: (state, action) => {
      state.error_message =
        action.payload.message || errorMessageTypes.DEFAULT_MESSAGE;
      state.goBack = true;
      state.loading = false;
    },
  },
});

export const {authStateClear, authStateError} = authSlice.actions;

export default authSlice.reducer;
