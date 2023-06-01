import { createSlice } from '@reduxjs/toolkit'

const initialState = {
	loading: false,
	user: null,
	loadingChangePass: false,
	loadingSendOTP: false,
	isInputOTP: false,
	loadingResetNewPassword: false,
	loadingLoginByOtp: false,
	loadingLoginByGoogle: false,
}

const authSlice = createSlice({
	name: 'auth',
	initialState,
	reducers: {
		login: (state) => {
			state.loading = true
			state.error = null
		},
		loginSuccess: (state, action) => {
			state.loading = false
			state.user = action.payload
		},
		loginError: (state, action) => {
			state.loading = false
			state.error = action.payload
		},
		register: (state) => {
			state.loading = true
			state.error = null
		},
		registerSuccess: (state) => {
			state.loading = false
			state.needVerify = true
			state.error = null
		},
		registerError: (state, action) => {
			state.loading = false
			state.error = action.payload
		},
		getUser: () => {},
		logout: () => {},
		resetPassword: () => {},
		clearAllReducers: () => {},
		changePassword: (state) => {
			state.loadingChangePass = true
		},
		changePasswordSuccess: (state) => {
			state.loadingChangePass = false
		},
		changePasswordError: (state) => {
			state.loadingChangePass = false
		},
		sendOTP: (state) => {
			state.loadingSendOTP = true
		},
		sendOTPSuccess: (state, action) => {
			state.loadingSendOTP = false
			state.isInputOTP = action.payload?.email
		},
		sendOTPError: (state) => {
			state.loadingSendOTP = false
		},
		resetNewPassword: (state) => {
			state.loadingResetNewPassword = true
		},
		resetNewPasswordSuccess: (state) => {
			state.loadingResetNewPassword = false
			state.isInputOTP = false
		},
		resetNewPasswordError: (state) => {
			state.loadingResetNewPassword = false
		},

		/** New login */
		loginByOtp: (state) => {
			state.loadingLoginByOtp = true
		},
		loginByOtpSuccess: (state, action) => {
			state.loadingLoginByOtp = false
		},
		loginByOtpError: (state, action) => {
			state.loadingLoginByOtp = false
		},
		verifyLoginByOtp: (state) => {
			state.loadingLoginByOtp = true
		},
		verifyLoginByOtpSuccess: (state, action) => {
			state.loadingLoginByOtp = false
		},
		verifyLoginByOtpError: (state, action) => {
			state.loadingLoginByOtp = false
		},
		loginByGoogle: (state, ) => {
			state.loadingLoginByGoogle = true
		},
		loginByGoogleSuccess: (state, action) => {
			state.loadingLoginByGoogle = false
			state.user = action.payload
		},
		loginByGoogleError: (state, ) => {
			state.loadingLoginByGoogle = false
		},
	},
})

export const authActions = authSlice.actions
export default authSlice.reducer
