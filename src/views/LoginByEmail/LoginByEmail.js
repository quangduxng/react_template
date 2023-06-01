import React, { useEffect } from "react"
import { yupResolver } from "@hookform/resolvers/yup"
import { useForm } from "react-hook-form"
import * as yup from "yup"
import { Button, notification } from "antd"
import InputField from "../RegisterSaas/Components/InputField"
import "./styles.scss"
import { regexEmail } from "../Workspaces/components/ModalAddWorkspace"
import logoGoogle from "../../assets/images/logo-google.png"
import { useDispatch, useSelector } from "react-redux"
import { authActions } from "../../reducers/Auth/authSlice"
import { useHistory, useLocation } from "react-router-dom"
import { API_HOST, API_URL } from "../../config"
import API_ENDPOINT from "../../constants/endpoints"
import { setToken, setUserId } from "../../utils/token"

function LoginByEmail() {
   const dispatch = useDispatch()
   const history = useHistory()
   const location = useLocation()
   const redirect = location.state?.redirect || "/"

   const loadingLoginByOtp = useSelector(
      (store) => store.auth.loadingLoginByOtp
   )

   const schemaResolver = yupResolver(
      yup.object().shape({
         email: yup
            .string()
            .required()
            .test("check-email", "Email is invalid", (value) => {
               const valueTrim = value?.trim()
               if (!regexEmail.test(valueTrim)) {
                  return false
               }
               return true
            }),
      })
   )

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
      // setError,
      watch,
      setValue,
   } = methods

   const submit = (values) => {
      dispatch(
         authActions.loginByOtp({
            email: values.email,
            history,
            redirect,
         })
      )
   }

   useEffect(() => {
      window.addEventListener("message", (event) => {
         if (event.origin.startsWith(API_HOST) && event.data) {
            const data = JSON.parse(event.data)
            if (data.error) {
               notification.error({
                  message: "Error when login by Google",
                  description: data.error,
                  duration: 6,
               })
            } else if (data.user && data.token) {
               setToken(data.token)
               setUserId(data.user?._id)
               dispatch(authActions.loginSuccess(data.user))
               setTimeout(() => history.push(redirect), 200)
            }
         }
      })
      return () => {
         window.removeEventListener("mesage", () => {})
      }
   }, [dispatch, history, redirect])

   const onLoginByGoogle = () => {
      const windowFeatures = "left=100,top=100,width=375,height=700"
      const windowPopup = window.open(
         `${API_URL}${API_ENDPOINT.LOGIN_GOOGLE}`,
         "Popup",
         windowFeatures
      )

      if (!windowPopup) {
         // The window wasn't allowed to open
         // This is likely caused by built-in popup blockers.
         // …
      }
      windowPopup.focus()
   }

   return (
      <div className="login-by-email h-100 d-flex justify-content-center align-items-center flex-column pt-5">
         <div className="title ">
            <h1>Please enter your email</h1>
            {/* <p>
               We suggest using the <b>email address you use at work.</b>
            </p> */}
         </div>
         <form
            className="form-center d-flex align-self-center flex-column"
            onSubmit={handleSubmit(submit)}
         >
            <div className="mt-3">
               <InputField
                  setValue={setValue}
                  className="d-flex flex-column"
                  errors={errors}
                  name="email"
                  inputProps={{
                     size: "large",
                     placeholder: "name@work-email.com",
                     style: { width: "300px" },
                  }}
               />
            </div>
            <div className="mt-4 d-flex w-100 justify-content-center">
               <Button
                  className="button-submit"
                  htmlType="submit"
                  type="primary"
                  loading={loadingLoginByOtp}
               >
                  Continue
               </Button>
            </div>
            <div className="separator">OR</div>
            <div onClick={onLoginByGoogle} className="login-by-google">
               <img src={logoGoogle} width={40} height={40} alt="logo-google" />
               <span>Continue with Google</span>
            </div>
         </form>
      </div>
   )
}

export default LoginByEmail
