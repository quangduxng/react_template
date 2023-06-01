import { notification } from "antd"
import { put, takeLatest } from "redux-saga/effects"
import {
   createNewUserService,
   deleteUserService,
   getUserDetailService,
   getUserServices,
   updateUserDetailService,
} from "../../services/auth"
import { userActions } from "./userSlice"

function* getListUserSaga() {
   try {
      const response = yield getUserServices()
      // console.log("function*getListUserSaga ~ response", response)
      if (response?.data?.status) {
         yield put(userActions.getListUserSuccess(response?.data?.data))
      }
   } catch (e) {
      console.log("function*getListWorkspaceSaga ~ e", e)
   }
}

function* deleteUserSaga(action) {
   const {id, callback} = action.payload
   try {
      const response = yield deleteUserService(id)
      // console.log("function*deleteUserSaga ~ response", response)
      if (response?.data?.status) {
         yield put(userActions.deleteUserSuccess())
         yield put(userActions.getListUser())
         notification.success({
            message: "Deleted user successfully",
            duration: 3,
         })
      }
   } catch (e) {
      console.log("function*getListWorkspaceSaga ~ e", e)
      yield put(userActions.deleteUserError())
      notification.error({
         message: "Error when delete user",
         description: e?.message,
         duration: 3,
      })
   } finally {
      if (callback) {
         callback()
      }
   }
}

function* getUserDetailSaga(action) {
   const { id } = action.payload
   console.log("function*getUserDetailSaga ~ id", id)
   try {
      const response = yield getUserDetailService(id)
      console.log("function*getUserDetailSaga ~ response", response)
      if (response?.data?.status) {
         yield put(userActions.getUserDetailSuccess(response?.data?.data))
      }
   } catch (e) {
      console.log("function*getUserDetailSaga ~ e", e)
      yield put(userActions.getUserDetailError())
      notification.error({
         message: "Error when get user detail",
         description: e?.message,
         duration: 3,
      })
   }
}

function* updateUserDetailSaga(action) {
   const { id, params, callbackDispatch } = action.payload
   console.log('function*updateUserDetailSaga ~ params', params);
   try {
      const response = yield updateUserDetailService(id, params)
      console.log("function*updateUserDetailSaga ~ response", response)
      if (response?.data?.status) {
         yield put(userActions.updateUserDetailSuccess())
         yield put(callbackDispatch)
         notification.success({
            message: "Update user successfully",
            duration: 3,
         })
      }
   } catch (e) {
      console.log("function*updateUserDetailSaga ~ e", e)

      yield put(userActions.updateUserDetailError())
      notification.error({
         message: "Error when update user",
         description: e?.message,
         duration: 3,
      })
   }
}

function* createNewUserSaga(action) {
   const { email, password, fullName, bio, callback, role } = action.payload
   try {
      const response = yield createNewUserService({
         email,
         password,
         fullname: fullName,
         bio,
         username: email?.substring(0, email?.indexOf("@")),
         role,
      })
      console.log("function*createNewUserSaga ~ response", response)
      if (response?.data?.status) {
         yield put(userActions.createNewUserSuccess())
         yield put(userActions.getListUser())
         callback()
         notification.success({
            message: "Create new user successfully",
            duration: 3,
         })
      }
   } catch (e) {
      console.log("function*createNewUserSaga ~ e", e)
      yield put(userActions.createNewUserError())
      notification.error({
         message: "Error when create new user",
         description: e?.message,
         duration: 3,
      })
   }
}

export default function* UserSaga() {
   yield takeLatest(userActions.getListUser, getListUserSaga)
   yield takeLatest(userActions.deleteUser, deleteUserSaga)
   yield takeLatest(userActions.getUserDetail, getUserDetailSaga)
   yield takeLatest(userActions.updateUserDetail, updateUserDetailSaga)
   yield takeLatest(userActions.createNewUser, createNewUserSaga)
   // yield takeLatest(userActions.getUserIDSaga, getUserIDSaga)
}
