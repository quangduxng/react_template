import React, { useState } from 'react'
import { Button, Typography } from "antd"
import * as yup from "yup"
import { useForm } from "react-hook-form"
import { yupResolver } from "@hookform/resolvers/yup"
import InputField from "../RegisterSaas/Components/InputField"
import "./styles.scss"
import { useDispatch, useSelector } from "react-redux"
import { userActions } from "../../reducers/Users/userSlice"
import { getUserId } from "../../utils/token"
import { authActions } from "../../reducers/Auth/authSlice"


const regexPassword =
   /^(?=.*[A-Z])(?=.*\d)(?=.*[#^()@$!%*?&])[A-Za-z\d#^()@$!%*?&]{8,}$/;

function ChangePassword() {

     const dispatch = useDispatch()
     const schemaResolver = yupResolver(
        yup.object().shape({
           currentPassword: yup.string('Current Password is required'),
           newPassword: yup.string('New Password is required'),
           confirmPassword: yup.string()
           .required("Confirm Password is required")
           .test('passwords-match', 'Confirm password not match', function(value){
             return this.parent.newPassword === value
           })
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
  
     const user = useSelector((store) => store.auth.user)
     const loadingChangePass = useSelector(
        (store) => store.auth.loadingChangePass
     )
 
  
     const {
        handleSubmit,
        // register,
        formState: { errors },
        setError,
        watch,
        setValue,
     } = methods
    const onSubmitChangePass = (values) => {
        let isError = false

        if (!values.currentPassword?.length) {
           isError = true
           setError("currentPassword", {
              type: "custom",
              message: "Current Password is required",
           })
        }
        if (!regexPassword.test(values.newPassword)) {
           isError = true
           setError("newPassword", {
              type: "custom",
              message: "New Password must be at least 8 characters, contain special characters, numbers, uppercase, lowercase letters and max 15 characters",
           })
        }
        if (!values.newPassword?.length) {
           isError = true
           setError("newPassword", {
              type: "custom",
              message: "New Password is required",
           })
        }
        if (values.newPassword === values.currentPassword) {
           isError = true
           setError("newPassword", {
              type: "custom",
              message: "New Password must be different from Current Password",
           })
        }
        if (isError) return
        dispatch(
           authActions.changePassword({
              email: user.email,
              currentPassword: values.currentPassword,
              newPassword: values.newPassword,
           })
        )
     }

  return (
    <div className='change-password'>
            <form
               onSubmit={handleSubmit(onSubmitChangePass)}
               className="col-12 ml-4 col-sm-10 col-md-10 col-lg-8 col-xl-4 mt-4"
            >
                  <Typography.Title level={3} style={{ margin: 0 }}>
                     Change Password
                  </Typography.Title>
               <div className="mt-4">
                  <InputField
                     label="Current password"
                     setValue={setValue}
                     errors={errors}
                     name="currentPassword"
                     inputProps={{
                        size: "middle",
                        type: "password",
                     }}
                  />
                  <InputField
                     inputProps={{
                        size: "middle",
                        type: "password",
                     }}
                     label="New password"
                     setValue={setValue}
                     errors={errors}
                     name="newPassword"
                     className="mt-3"
                  />
                 <InputField
                     inputProps={{
                        size: "middle",
                        type: "password",
                        
                     }}
                     label="Confirm password"
                     setValue={setValue}
                     errors={errors}
                     name="confirmPassword"
                     className="mt-3"
                  />
                    <Button
                     loading={loadingChangePass}
                     htmlType="submit"
                     type="primary"
                     size="large"
                     className='float-right mt-2'
                  >
                     Update
                  </Button>
               </div>
            </form>
    </div>
  )
}

export default ChangePassword