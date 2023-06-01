import axios from "axios";
import { notification } from "antd"
import { API_URL } from "../config";
import {authActions} from '../reducers/Auth/authSlice';
import {store} from '../store';
import {getToken} from "../utils/token";

const API = axios.create({
   baseURL: API_URL,
});

API.defaults.headers = {
   'Cache-Control': 'no-cache',
 };

API.interceptors.request.use((config) => {
   const token = getToken();
   if (token) {
      config.headers.Authorization = "Bearer " + getToken();
   }
   return config;
});

API.interceptors.response.use(
   function (response) {
      // Do something with response data
      return response;
   },
   function (error) {
      if (error.response.status === 401) {
        store.dispatch(authActions.logout())
      }
      if (error.response?.data?.message?.includes('you must provide a valid token')) {
         notification.error({
            message: "Token expired! Please login again",
            duration: 3,
         })
         store.dispatch(authActions.logout())
      }
      return Promise.reject(error.response.data);
   }
);

export default API;
