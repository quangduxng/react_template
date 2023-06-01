import React from "react"
import * as yup from "yup"
import { useForm } from "react-hook-form"
import { yupResolver } from "@hookform/resolvers/yup"
import { AppImages } from "../../assets/images"
import InputField from "../RegisterSaas/Components/InputField"
import { Button } from "antd"
import { useDispatch, useSelector } from "react-redux"
import "./styles.scss"
import { authActions } from "../../reducers/Auth/authSlice"
import { useHistory } from "react-router-dom"
import {SCREEN_NAME} from '../../constants/screens';
import {regexEmail} from '../Workspaces/components/ModalAddWorkspace';

const Login = () => {
   const history = useHistory()
   const dispatch = useDispatch()

   const loading = useSelector(store => store.auth.loading)

   const schemaResolver = yupResolver(
      yup.object().shape({
         email: yup.string().required().test("check-email", "Email is invalid", (value) => {
            const valueTrim = value?.trim()
            if (!regexEmail.test(valueTrim)) {
               return false
            }
            return true
         }),
         password: yup.string().required(),
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
      // watch,
      setValue,
   } = methods

   const onSubmit = (values) => {
      console.log("onSubmit ~ values", values)
      dispatch(
         authActions.login({
            email: values.email.trim(),
            password: values.password,
            history,
         })
      )
   }

   return (
      <div className="login w-100 h-100 d-flex align-items-center justify-content-center">
         <form
            className="form-center d-flex align-self-center flex-column"
            onSubmit={handleSubmit(onSubmit)}
         >
            <div className='card-login'>
               <div className="d-flex w-100 flex-column align-items-center">
                  <img
                     src={AppImages.iconWorkcec}
                     width={256}
                     height={256}
                     alt="workcec"
                  />
               </div>

               <div className="mt-3">
                  <InputField
                     label="Email"
                     setValue={setValue}
                     errors={errors}
                     name="email"
                     inputProps={{
                        size: 'middle'
                     }}
                  />
               </div>
               <div className="mt-3">
                  <InputField
                     label="Password"
                     setValue={setValue}
                     errors={errors}
                     name="password"
                     inputProps={{
                        type: "password",
                     }}
                  />
               </div>
               <div className="d-flex w-100 mt-3">
                  <div onClick={() => history.push(SCREEN_NAME.FORGOT_PASSWORD)} className='forgot-pass'>Forgot Password</div>
               </div>
               <div className="mt-4 d-flex w-100 justify-content-center">
                  <Button
                     className="button-submit"
                     htmlType="submit"
                     type="primary"
                     loading={loading}
                  >
                     Submit
                  </Button>
               </div>
            </div>
         </form>
      </div>
   )
}

export default Login
