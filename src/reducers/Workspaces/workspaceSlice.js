import { createSlice } from '@reduxjs/toolkit'

const initialState = {
	loading: false,
	listWorkspace: [],
	loadingCancelWorkspace: false,
	loadingRestartWorkspace: false,
	loadingWorkspaceDetail: false,
	currentWorkspaceDetail: null,
	loadingUpdateWorkspace: false,
	loadingChangePlanWorkspace: false,
	loadingToggleActiveWorkspace: false,
	loadingDeleteWorkspace: false,
	loadingWorkspaceSettings: false,
	workspaceSettings: [],
	loadingSaveSettings: false,
	loadingSyncSettings: false,
	loadingCreateSetting: false,
	loadingDeleteSetting: false,
	currentInitializingWorkspace: {
		status: null,
		id: null,
	},
}

const workspaceSlice = createSlice({
	name: 'workspace',
	initialState,
	reducers: {
		getListWorkspace: (state) => {
			state.loading = true
		},
		getListWorkspaceSuccess: (state, action) => {
			state.loading = false
			state.listWorkspace = action.payload
		},
		getListWorkspaceError: (state, action) => {
			state.loading = false
		},
		cancelWorkspace: (state) => {
			state.loadingCancelWorkspace = true
		},
		cancelWorkspaceSuccess: (state) => {
			state.loadingCancelWorkspace = false
		},
		cancelWorkspaceError: (state) => {
			state.loadingCancelWorkspace = false
		},
		restartWorkspace: (state) => {
			state.loadingRestartWorkspace = true
		},
		restartWorkspaceSuccess: (state) => {
			state.loadingRestartWorkspace = false
		},
		restartWorkspaceError: (state) => {
			state.loadingRestartWorkspace = false
		},
		getWorkspaceDetail: (state) => {
			state.loadingWorkspaceDetail = true
		},
		getWorkspaceDetailSuccess: (state, action) => {
			state.loadingWorkspaceDetail = false
			state.currentWorkspaceDetail = action.payload
		},
		getWorkspaceDetailError: (state) => {
			state.loadingWorkspaceDetail = false
			state.currentWorkspaceDetail = null
		},
		updateWorkspaceDetail: (state) => {
			state.loadingUpdateWorkspace = true
		},
		updateWorkspaceDetailSuccess: (state) => {
			state.loadingUpdateWorkspace = false
		},
		updateWorkspaceDetailError: (state) => {
			state.loadingUpdateWorkspace = false
		},
		registerSaas: (state) => {
			state.loadingRegisterSaas = true
		},
		registerSaasSuccess: (state) => {
			state.loadingRegisterSaas = false
		},
		registerSaasError: (state) => {
			state.loadingRegisterSaas = false
		},
		changePlanWorkspace: (state) => {
			state.loadingChangePlanWorkspace = true
		},
		changePlanWorkspaceSuccess: (state) => {
			state.loadingChangePlanWorkspace = false
		},
		changePlanWorkspaceError: (state) => {
			state.loadingChangePlanWorkspace = false
		},
		toggleActiveWorkspace: (state) => {
			state.loadingToggleActiveWorkspace = true
		},
		toggleActiveWorkspaceSuccess: (state) => {
			state.loadingToggleActiveWorkspace = false
		},
		toggleActiveWorkspaceError: (state) => {
			state.loadingToggleActiveWorkspace = false
		},
		deleteWorkspace: (state) => {
			state.loadingDeleteWorkspace = true
		},
		deleteWorkspaceSuccess: (state) => {
			state.loadingDeleteWorkspace = false
		},
		deleteWorkspaceError: (state) => {
			state.loadingDeleteWorkspace = false
		},
		createWorkspaceSetting: (state) => {
			state.loadingCreateSetting = true
		},
		createWorkspaceSettingSuccess: (state) => {
			state.loadingCreateSetting = false
		},
		createWorkspaceSettingError: (state) => {
			state.loadingCreateSetting = false
		},
		changeWorkspaceSetting: (state, action) => {
			state.workspaceSettings = action.payload
		},
		getWorkspaceSetting: (state) => {
			state.loadingWorkspaceSettings = true
		},
		getWorkspaceSettingSuccess: (state, action) => {
			state.loadingWorkspaceSettings = false
			state.workspaceSettings = action.payload
		},
		getWorkspaceSettingError: (state) => {
			state.loadingWorkspaceSettings = false
			state.workspaceSettings = null
		},
		saveWorkspaceSettings: (state) => {
			state.loadingSaveSettings = true
		},
		saveWorkspaceSettingsSuccess: (state) => {
			state.loadingSaveSettings = false
		},
		saveWorkspaceSettingsError: (state) => {
			state.loadingSaveSettings = false
		},
		syncWorkspaceSettings: (state) => {
			state.loadingSyncSettings = true
		},
		syncWorkspaceSettingsSuccess: (state) => {
			state.loadingSyncSettings = false
		},
		syncWorkspaceSettingsError: (state) => {
			state.loadingSyncSettings = false
		},
		deleteWorkspaceSetting: (state) => {
			state.loadingDeleteSetting = true
		},
		deleteWorkspaceSettingSuccess: (state) => {
			state.loadingDeleteSetting = false
		},
		deleteWorkspaceSettingError: (state) => {
			state.loadingDeleteSetting = false
		},
		getStatusCreateWorkspace: (state) => {},
		setCurrentInitalizingWorkspace: (state, action) => {
			state.currentInitializingWorkspace = action.payload
		}
	},
})

export const workspaceActions = workspaceSlice.actions
export default workspaceSlice.reducer
