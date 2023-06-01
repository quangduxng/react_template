import { put, select, takeLatest } from "redux-saga/effects"
import { SCREEN_NAME } from "../../constants/screens"
import { authActions } from "./authSlice"
import {
   changePasswordService,
   forgotUserPasswordService,
   getUserServices,
   loginByOtp,
   postLogin,
   resetPasswordService,
   sendOTPService,
   verifyLoginByOtp,
} from "../../services/auth"
import {
   getUserId,
   removeToken,
   removeUserId,
   setToken,
   setUserId,
} from "../../utils/token"
import { notification } from "antd"
import { browserHistory } from "../../App"

function* login(action) {
   const { email, password, history } = action.payload
   try {
      const response = yield postLogin(email, password)
      if (response.data.status) {
         yield setToken(response.data.data.token)
         yield setUserId(response.data.data.user._id)
         yield put(authActions.loginSuccess(response.data.data.user))
         history.push(SCREEN_NAME.HOME)
      }
   } catch (e) {
      console.log("function*login ~ e", e)
      notification.error({
         message: "Error when login",
         description: e?.message,
         duration: 3,
      })
   }
}

function* getUserSaga() {
   const userId = getUserId()
   if (userId) {
      try {
         const response = yield getUserServices(userId)
         yield put(authActions.loginSuccess(response.data.data))
      } catch (e) {
         console.log("error get user", e)
         yield put(authActions.logout())
      }
   }
}

function* logoutSaga() {
   yield removeToken()
   yield removeUserId()
   yield put(authActions.clearAllReducers())
   yield put(authActions.loginSuccess(null))
   setTimeout(()=>{
      browserHistory.replace(window.location.replace(process.env.REACT_APP_WORKCEC_URL +"/login"))
   },200)
}

function* resetPasswordSaga(action) {
   const { email } = action.payload
   try {
      const response = yield resetPasswordService({
         email,
      })
      if (response.data.status) {
         notification.success({
            message: response.data.message,
            description: `An email has been sent to ${email}`,
            duration: 3,
         })
      }
   } catch (e) {
      notification.error({
         message: "Error when reset password",
         description: e?.message,
         duration: 3,
      })
   }
}

function* changePasswordSaga(action) {
   try {
      const response = yield changePasswordService(action.payload)
      if (response.data.status) {
         yield put(authActions.changePasswordSuccess())
         notification.success({
            message: "Change password successfully",
            duration: 3,
         })
      }
   } catch (e) {
      yield put(authActions.changePasswordError())
      notification.error({
         message: "Error when change password",
         description: e?.message,
         duration: 3,
      })
   }
}

function* sendOTPSaga(action) {
   const { email, history, callback } = action.payload
   try {
      const response = yield sendOTPService({ email })
      if (response.data.status) {
         yield put(authActions.sendOTPSuccess({ email }))
         notification.success({
            message: `An OTP Code has been sent to ${email}`,
            duration: 3,
         })
         history && history.push(SCREEN_NAME.INPUT_OTP)
         callback && callback()
      }
   } catch (e) {
      yield put(authActions.sendOTPError())
      notification.error({
         message: "Error when change password",
         description: e?.message,
         duration: 3,
      })
   }
}

function* resetNewPasswordSaga(action) {
   const { history, otp, newPassword } = action.payload
   const isInputOTP = yield select((store) => store.auth.isInputOTP)
   try {
      const response = yield forgotUserPasswordService({
         email: isInputOTP,
         otp,
         newPassword,
      })
      if (response.data.status) {
         yield put(authActions.resetNewPasswordSuccess())
         notification.success({
            message: `Reset password successfully`,
            duration: 3,
         })
         history.replace(SCREEN_NAME.LOGIN)
      }
   } catch (e) {
      yield put(authActions.resetNewPasswordError())
      notification.error({
         message: "Error when reset password",
         description: e?.message,
         duration: 3,
      })
   }
}

function* loginByOtpSaga(action) {
   try {
      const { email, history, redirect } = action.payload
      const response = yield loginByOtp({email})
      if (response.data.status) {
         history.push(SCREEN_NAME.VERIFY_EMAIL, {
            email,
            redirect
         })
      }
      yield put(authActions.loginByOtpSuccess())
      console.log("function*loginByOtpSaga ~ response:", response)
   } catch (e) {
      console.log("error login by otp", e.message)
      notification.error({
         message: "Error when get OTP",
         description: e?.message,
         duration: 3,
      })
      yield put(authActions.loginByOtpError())
   }
}

function* verifyLoginByOtpSaga(action) {
   try {
      const { email, otpCode, history, redirect } = action.payload
      console.log('function*verifyLoginByOtpSaga ~ redirect:', redirect);
      const response = yield verifyLoginByOtp({email, totpToken: otpCode})
      if (response.data.data.status) {
         setToken(response.data.data?.data?.token)
         setUserId(response.data.data?.data.user?._id)
         yield put(authActions.loginSuccess(response.data.data?.data.user))
         notification.success({
            message: response.data?.data?.message,
            duration: 3,
         })
         history.push(redirect || '/')
      }
      console.log("function*loginByOtpSaga ~ response:", response)
   } catch (e) {
      console.log("error login by otp", e.message)
      notification.error({
         message: "Error when verify OTP",
         description: e?.message,
         duration: 3,
      })
      yield put(authActions.loginByOtpError())
   }
}


export default function* AuthSaga() {
   yield takeLatest(authActions.login, login)
   yield takeLatest(authActions.getUser, getUserSaga)
   yield takeLatest(authActions.logout, logoutSaga)
   yield takeLatest(authActions.resetPassword, resetPasswordSaga)
   yield takeLatest(authActions.changePassword, changePasswordSaga)
   yield takeLatest(authActions.sendOTP, sendOTPSaga)
   yield takeLatest(authActions.resetNewPassword, resetNewPasswordSaga)
   yield takeLatest(authActions.loginByOtp, loginByOtpSaga)
   yield takeLatest(authActions.verifyLoginByOtp, verifyLoginByOtpSaga)

}
