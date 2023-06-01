import React, { useEffect, useRef, useState } from "react"
import * as yup from "yup"
import { useForm } from "react-hook-form"
import { yupResolver } from "@hookform/resolvers/yup"
import { AppImages } from "../../assets/images"
import InputField from "../RegisterSaas/Components/InputField"
import { Button, Typography } from "antd"
import { useDispatch, useSelector } from "react-redux"
import "./styles.scss"
import { authActions } from "../../reducers/Auth/authSlice"
import { useHistory } from "react-router-dom"
import { SCREEN_NAME } from "../../constants/screens"
import { regexPassword } from "../Users/components/ModalAddUser"

const InputOTP = () => {
   const dispatch = useDispatch()
   const schemaResolver = yupResolver(
      yup.object().shape({
         otp: yup.string().required("OTP is required"),
         newPassword: yup
            .string()
            .required("New Password is required")
            .test(
               "check-valid-password",
               "Password must be at least 8 characters, contain special characters, numbers, uppercase, lowercase letters and max 15 characters",
               (value) => {
                  if (!regexPassword.test(value)) {
                     return false
                  }
                  return true
               }
            ),
         confirmNewPassword: yup
            .string()
            .required("Confirm Password is required")
            .test(
               "check-valid-password",
               "Password must be at least 8 characters, contain special characters, numbers, uppercase, lowercase letters and max 15 characters",
               (value) => {
                  if (!regexPassword.test(value)) {
                     return false
                  }
                  return true
               }
            ),
      })
   )

   const isInputOTP = useSelector((store) => store.auth.isInputOTP)
   const loadingSendOTP = useSelector(store => store.auth.loadingSendOTP)
   const loadingResetNewPassword = useSelector(
      (store) => store.auth.loadingResetNewPassword
   )

   const history = useHistory()

   const [timeoutOTP, setTimeoutOTP] = useState(60)

   const refTimeOut = useRef()

   const methods = useForm({
      resolver: schemaResolver,
      mode: "all",
      // defaultValues: {
      //    name: "",
      //    email: "",
      //    password: "",
      // },
   })
   const {
      handleSubmit,
      // register,
      formState: { errors },
      setError,
      // watch,
      setValue,
   } = methods

   useEffect(() => {
      if (!isInputOTP) {
         history.replace(SCREEN_NAME.LOGIN_BY_EMAIL)
      }
   }, [isInputOTP, history])

   const onSubmit = (values) => {
      console.log("onSubmit ~ values", values)
      if (values.newPassword !== values.confirmNewPassword) {
         return setError("confirmNewPassword", {
            type: "custom",
            message: "Confirm Password must same as New Password",
         })
      }
      dispatch(
         authActions.resetNewPassword({
            otp: values.otp,
            newPassword: values.newPassword,
            history,
         })
      )
   }

   useEffect(() => {
      if (timeoutOTP === 60) {
         refTimeOut.current = setInterval(() => setTimeoutOTP(prev => prev > 0 ? prev - 1 : 0), 1000)
      }
      if (timeoutOTP === 0) {
         clearInterval(refTimeOut.current)
      }
   }, [timeoutOTP])

   const onResendOTP = () => {
      dispatch(
         authActions.sendOTP({
            email: isInputOTP,
            callback: () => {
               setTimeoutOTP(60)
            }
         })
      )
      
   }

   return (
      <div className="login w-100 h-100 d-flex align-items-center justify-content-center">
         <form
            className="form-center d-flex align-self-center flex-column"
            onSubmit={handleSubmit(onSubmit)}
         >
            <div className="card-login">
               <div
                  style={{ cursor: "pointer" }}
                  onClick={() => {
                     history.goBack()
                  }}
               >
                  <img
                     src={require("../../assets/images/left.png")}
                     width={24}
                     height={24}
                     alt="back"
                  />
               </div>
               <div className="d-flex w-100 flex-column align-items-center">
                  <img
                     src={AppImages.iconWorkcec}
                     width={256}
                     height={256}
                     alt="workcec"
                  />
               </div>
               <Typography.Title level={4}>Input OTP</Typography.Title>

               <div className="mt-3 ">
                  <div className="d-flex align-items-end">
                     <InputField
                        label="OTP"
                        setValue={setValue}
                        errors={errors}
                        name="otp"
                        inputProps={{
                           size: "middle",
                           type: "number",
                           maxLength: 6,
                        }}
                        className='d-flex flex-column flex-fill'
                     />
                     <Button loading={loadingSendOTP} className='ml-3' disabled={timeoutOTP > 0} onClick={onResendOTP}>
                        {timeoutOTP > 0 ? timeoutOTP : "Resend OTP"}
                     </Button>
                  </div>

                  <InputField
                     className="mt-3"
                     label="New Password"
                     setValue={setValue}
                     errors={errors}
                     name="newPassword"
                     inputProps={{
                        size: "middle",
                        type: "password",
                     }}
                  />
                  <InputField
                     className="mt-3"
                     label="Confirm Password"
                     setValue={setValue}
                     errors={errors}
                     name="confirmNewPassword"
                     inputProps={{
                        size: "middle",
                        type: "password",
                     }}
                  />
               </div>
               <div className="mt-4 d-flex w-100 justify-content-center">
                  <Button
                     className="button-submit"
                     htmlType="submit"
                     type="primary"
                     loading={loadingResetNewPassword}
                  >
                     Reset Password
                  </Button>
               </div>
            </div>
         </form>
      </div>
   )
}

export default InputOTP
