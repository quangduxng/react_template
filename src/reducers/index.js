import { combineReducers } from "redux";
import authSlice from './Auth/authSlice';
import userSlice from './Users/userSlice';
import workspaceSlice from './Workspaces/workspaceSlice';

const combinedReducer = combineReducers({
  auth: authSlice,
  workspace: workspaceSlice,
  user: userSlice
});

export default (state, action) => {
	if (action.type === 'auth/clearAllReducers') {
		state = undefined
	}
	return combinedReducer(state, action)
}