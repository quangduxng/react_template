import { all } from 'redux-saga/effects';
import AuthSaga from '../reducers/Auth/authSaga';
import UserSaga from '../reducers/Users/userSaga';
import WorkspaceSaga from '../reducers/Workspaces/workspaceSaga';

export default function* rootSaga() {
  yield all([
    AuthSaga(),
    WorkspaceSaga(),
    UserSaga(),
  ]);
}
