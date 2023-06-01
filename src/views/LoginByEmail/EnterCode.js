import { Button } from "antd"
import React, { useLayoutEffect, useState } from "react"
import ReactCodeInput from "react-code-input"
import { useDispatch, useSelector } from "react-redux"
import { useHistory, useLocation } from "react-router-dom"
import { SCREEN_NAME } from "../../constants/screens"
import { authActions } from "../../reducers/Auth/authSlice"

function EnterCode() {
   const location = useLocation()
   const history = useHistory()
   const dispatch = useDispatch()
   const { email, redirect } = location.state || null
   const [pinCode, setPinCode] = useState("")
   const loadingLoginByOtp = useSelector(
      (store) => store.auth.loadingLoginByOtp
   )

   useLayoutEffect(() => {
      if (!email) {
         history.replace(SCREEN_NAME.LOGIN_BY_EMAIL)
      }
   }, [email, history])

   const checkPinCode = () => {
      dispatch(
         authActions.verifyLoginByOtp({
            email,
            otpCode: pinCode,
            history,
            redirect,
         })
      )
   }

   const handlePinChange = (pinCode) => {
      setPinCode(pinCode)
   }
   return (
      <div className="enter-code h-100">
         <div className="title">
            <h1>Check your email for a code</h1>
            <p>
               We've sent a 6-character code to <b>{email}</b>. The code expires
               shortly, so please enter it soon.
            </p>
         </div>
         <div className="container-input-number">
            <div className="box-otp">
               <ReactCodeInput
                  id="pinCode"
                  type="number"
                  isValid={pinCode.length === 6}
                  fields={6}
                  onChange={handlePinChange}
                  value={pinCode}
               />
               <Button
                  loading={loadingLoginByOtp}
                  className="button-submit"
                  disabled={pinCode.length < 6}
                  onClick={checkPinCode}
               >
                  Submit
               </Button>
            </div>
         </div>
      </div>
   )
}

export default EnterCode
