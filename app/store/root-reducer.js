import {combineReducers} from 'redux';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {persistReducer} from 'redux-persist';
import userSlice from './slice/user-slice';
import authSlice from './slice/auth-slice';
import loadSlice from './slice/load-slice';
import masterDbSlice from './slice/master-db-slice';
import notificationSlice from './slice/notification-slice';
import driverSlice from './slice/driver-slice';
import vehicleSlice from './slice/vehicle-slice';
import tripsSlice from './slice/trips-slice';
import areaSlice from './slice/area-slice';

const persistConfig = {
  key: 'root-transporter',
  storage: AsyncStorage,
  blacklist: ['error_message', 'driver', 'vehicle', 'load', 'confirmed_trip'],
};

const userConfig = {
  key: 'user',
  version: 1,
  storage: AsyncStorage,
  keyPrefix: '',
  blacklist: ['error_message', 'isChanged'],
};
const authConfig = {
  key: 'auth',
  version: 1,
  storage: AsyncStorage,
  keyPrefix: '',
  blacklist: ['error_message', 'error'],
};
const loadConfig = {
  key: 'load',
  version: 1,
  storage: AsyncStorage,
  keyPrefix: '',
  blacklist: ['error_message', 'error', 'bid'],
};
const driverConfig = {
  key: 'driver',
  version: 1,
  storage: AsyncStorage,
  keyPrefix: '',
  blacklist: ['driver', 'error_message', 'error'],
};
const vehicleConfig = {
  key: 'vehicle',
  version: 1,
  storage: AsyncStorage,
  keyPrefix: '',
  blacklist: ['vehicle', 'error_message', 'error'],
};
const tripsConfig = {
  key: 'trips',
  version: 1,
  storage: AsyncStorage,
  keyPrefix: '',
  blacklist: ['error_message', 'error', 'confirmed_trip'],
};
const masterDbConfig = {
  key: 'masterDb',
  version: 1,
  storage: AsyncStorage,
  keyPrefix: '',
  blacklist: ['error_message', 'error'],
};
const notificationConfig = {
  key: 'notification',
  version: 1,
  storage: AsyncStorage,
  keyPrefix: '',
  blacklist: ['error_message', 'error'],
};

const areaConfig = {
  key: 'area',
  version: 1,
  storage: AsyncStorage,
  keyPrefix: '',
  blacklist: ['error_message', 'error'],
};

const rootReducer = combineReducers({
  user: persistReducer(userConfig, userSlice),
  auth: persistReducer(authConfig, authSlice),
  load: persistReducer(loadConfig, loadSlice),
  masterDb: persistReducer(masterDbConfig, masterDbSlice),
  notification: persistReducer(notificationConfig, notificationSlice),
  driver: persistReducer(driverConfig, driverSlice),
  vehicle: persistReducer(vehicleConfig, vehicleSlice),
  trips: persistReducer(tripsConfig, tripsSlice),
  area: persistReducer(areaConfig, areaSlice),
});

export default persistReducer(persistConfig, rootReducer);
