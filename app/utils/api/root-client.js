import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import {BACK_END_URI, PRODUCTION, BACK_END_URI_TEST} from '@env';

const rootClient = axios.create();
const publicClint = axios.create();

const baseURL = PRODUCTION == 'true' ? BACK_END_URI : BACK_END_URI_TEST;
// const baseURL = 'https://app.trollaexpress.com/api/v1/transporter/';
console.log('running on --------', baseURL);

rootClient.defaults.timeout = 8000;
publicClint.defaults.timeout = 8000;
rootClient.defaults.baseURL = baseURL;
publicClint.defaults.baseURL = baseURL;

rootClient.interceptors.request.use(
  async config => {
    const token = await AsyncStorage.getItem('accessToken');
    if (token) {
      config.headers.Authorization = 'Bearer ' + token;
    } else {
      config.headers.Authorization = '';
    }
    return config;
  },
  error => {
    // console.log('error rq-----', error);
    return Promise.reject(error.response.data);
  },
);

rootClient.interceptors.response.use(
  response => response.data,
  async error => {
    const {response, config: originalRequest} = error;
    const status = response ? response.status : null;

    if (error.message === 'Network Error') {
      return Promise.reject(error.message);
    }

    if (response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      // console.log('token expired');
      const oldRefreshToken = await AsyncStorage.getItem('refreshToken');
      if (oldRefreshToken) {
        try {
          const res = await publicClint.post('refresh', {
            refresh_token: oldRefreshToken,
          });
          const {accessToken} = res.data;
          // console.log('sucees nw token', accessToken);

          await AsyncStorage.setItem('accessToken', accessToken);
          // localStorage.setItem("refreshToken", refreshToken);
          // axios.defaults.headers.common['Authorization'] =
          //   'Bearer ' + accessToken;
          rootClient.defaults.headers.common['Authorization'] =
            'Bearer ' + accessToken;
          return rootClient(originalRequest);
        } catch (error) {
          console.log('error', error);
          await AsyncStorage.setItem('refreshToken', 'expired');
          return Promise.reject(error.response.data);
        }
      }
    }
    return Promise.reject(error.response.data);
  },
);
export default rootClient;
