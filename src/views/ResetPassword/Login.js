import React from "react"
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
import {regexEmail} from '../Workspaces/components/ModalAddWorkspace';

const ResetPassword = () => {
   const dispatch = useDispatch()
   const schemaResolver = yupResolver(
      yup.object().shape({
         email: yup.string().required('Email is required').test("check-email", "Email is invalid", (value) => {
            const valueTrim = value?.trim()
            if (!regexEmail.test(valueTrim)) {
               return false
            }
            return true
         }),
      })
   )

   const loadingSendOTP = useSelector(store => store.auth.loadingSendOTP)

   const history = useHistory()
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

   // const [timeOutOTP, setTimeOutOTP] = useState(0)
   // const intervalTimeout = useRef(null)

   // useEffect(() => {
   //    if (timeOutOTP === 0) {
   //       clearInterval(intervalTimeout.current)
   //    }
   // }, [timeOutOTP])

   const onSubmit = (values) => {
      console.log("onSubmit ~ values", values)
      dispatch(
         authActions.sendOTP({
            email: values.email.trim(),
            history,
         })
      )
      // setTimeOutOTP(60)
      // intervalTimeout.current = setInterval(() => setTimeOutOTP(prev => {
      //    if (prev > 0) {
      //       return prev - 1;
      //    } 
      //    return 0
      // }), 1000)
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
               <Typography.Title level={4}>Forgot Password</Typography.Title>

               <div className="mt-3">
                  <InputField
                     label="Email"
                     setValue={setValue}
                     errors={errors}
                     name="email"
                     inputProps={{
                        size: "middle",
                     }}
                  />
               </div>
               <div className="mt-4 d-flex w-100 justify-content-center">
                  <Button
                     className="button-submit"
                     htmlType="submit"
                     type="primary"
                     // disabled={timeOutOTP !== 0 }
                     loading={loadingSendOTP}
                  >
                     Send email
                  </Button>
               </div>
            </div>
         </form>
      </div>
   )
}

export default ResetPassword
