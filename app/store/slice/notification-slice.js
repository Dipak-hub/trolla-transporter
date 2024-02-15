import {createReducer, createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import {rootClient} from '../../utils';
import moment from 'moment';
const initialState = {
  loading: false,
  error_message: null,
  unread_notification: false,
  notifications: [],
  notification: {},
};

const notificationSlice = createSlice({
  name: 'notification',
  initialState,
  reducers: {
    setNotification(state, action) {
      const {notify, data} = action.payload;
      const {title, body} = notify;
      const time = moment().format();
      state.notifications = [
        {title, body, time, action: data.action},
        ...state.notifications,
      ];
      state.unread_notification = state.unread_notification + 1;
    },
    readAllNotification(state, action) {
      state.unread_notification = 0;
    },
    clearNotification: () => initialState,
  },
  extraReducers: {},
});

export const {setNotification, readAllNotification, clearNotification} =
  notificationSlice.actions;

export default notificationSlice.reducer;
