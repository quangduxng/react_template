import { createSlice } from '@reduxjs/toolkit'

const initialState = {
	loading: false,
	loadingDeleteUser: false,
	loadingUserDetail: false,
	loadingUpdateUserDetail: false,
	listUser: [],
	currentUserDetail: null,
	loadingCreateUser: false
}

const userSlice = createSlice({
	name: 'user',
	initialState,
	reducers: {
		getListUser: (state) => {
			state.loading = true
		},
		getUserID: (state,action) => {
			state.loading = false
			state.UserID = action.payload
		},
		getListUserSuccess: (state, action) => {
			state.loading = false
			state.listUser = action.payload
		},
		getListUserError: (state) => {
			state.loading = false
		},
		deleteUser: (state) => {
			state.loadingDeleteUser = true
		},
		deleteUserSuccess: (state, action) => {
			state.loadingDeleteUser = false
		},
		deleteUserError: (state, action) => {
			state.loadingDeleteUser = false
		},
		getUserDetail: (state) => {
			state.loadingUserDetail = true
		},
		getUserDetailSuccess: (state, action) => {
			state.loadingUserDetail = false
			state.currentUserDetail = action.payload
		},
		getUserDetailError: (state) => {
			state.loadingUserDetail = false
			state.currentUserDetail = null
		},
		updateUserDetail: (state) => {
			state.loadingUpdateUserDetail = true
		},
		updateUserDetailSuccess: (state) => {
			state.loadingUpdateUserDetail = false
		},
		updateUserDetailError: (state) => {
			state.loadingUpdateUserDetail = false
		},
		createNewUser: (state) => {
			state.loadingCreateUser = true
		},
		createNewUserSuccess: (state) => {
			state.loadingCreateUser = false
		},
		createNewUserError: (state) => {
			state.loadingCreateUser = false
		},
	},
})

export const userActions = userSlice.actions
export default userSlice.reducer
