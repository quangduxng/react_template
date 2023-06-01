import API_ENDPOINT from "../constants/endpoints"
import API from "./api"
import axios from "axios";
import {
   API_URL
} from "../config";
import jwt_decode from "jwt-decode";

export const postLogin = async (email, password) => {
   try {
      return API.post(API_ENDPOINT.LOGIN, {
         email,
         password,
      })
   } catch (e) {
      console.log("error post login", e)
   }
}

export const getUserServices = async (id) => {
   try {
      return API.get(
         id ? `${API_ENDPOINT.GET_USER}/${id}` : API_ENDPOINT.GET_USER
      )
   } catch (e) {
      console.log("error post login", e)
   }
}

export const deleteUserService = (id) => {
   try {
      return API.delete(
         `${API_ENDPOINT.GET_USER}/${id}`
      )
   } catch (e) {
      console.log("error delete user", e)
   }
}

export const getUserDetailService = (id) => {
   try {
      return API.get(
         `${API_ENDPOINT.GET_USER}/${id}`
      )
   } catch (e) {
      console.log("error get user detail", e)
   }
}

export const updateUserDetailService = (id, params) => {
   try {
      return API.patch(
         `${API_ENDPOINT.GET_USER}/${id}`, params
      )
   } catch (e) {
      console.log("error update user detail", e)
   }
}

export const createNewUserService = (params) => {
   try {
      return API.post(
         `${API_ENDPOINT.REGISTER}`, params
      )
   } catch (e) {
      console.log("error create new user", e)
   }
}

export const resetPasswordService = (params) => {
   try {
      return API.post(
         `${API_ENDPOINT.RESET_PASSWORD}`, params
      )
   } catch (e) {
      console.log("error reset password ", e)
   }
}

export const changePasswordService = (params) => {
   try {
      return API.post(
         `${API_ENDPOINT.CHANGE_PASSWORD}`, params
      )
   } catch (e) {
      console.log("error change password", e)
   }
}

export const sendOTPService = (params) => {
   try {
      return API.post(
         `${API_ENDPOINT.SEND_OTP}`, params
      )
   } catch (e) {
      console.log("error sent otp", e)
   }
}

export const forgotUserPasswordService = (params) => {
   try {
      return API.post(
         `${API_ENDPOINT.FORGOT_USER_PASSWORD}`, params
      )
   } catch (e) {
      console.log("error forgot user password", e)
   }
};

export const loginByOtp = (params) => {
   return API.post(API_ENDPOINT.LOGIN_BY_OTP, params)
}

export const verifyLoginByOtp = (params) => {
   return API.post(API_ENDPOINT.VERIFY_LOGIN_BY_OTP, params)
};

export const verifyLoginByToken = (token) => {
   try {
      let config = {
         headers: {
            'Authorization': 'Bearer ' + token
         }
      }

      var decoded = jwt_decode(token);
      let body = {
         email: decoded.email,
      }

      return axios.post(
         API_URL + API_ENDPOINT.GET_USER_BY_TOKEN, body, config,
      );
   } catch (e) {
      console.log("error verify token", e)
   }
}