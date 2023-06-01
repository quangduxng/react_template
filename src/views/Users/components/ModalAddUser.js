import { Checkbox, Modal } from "antd"
import React from "react"
import * as yup from "yup"
import { useForm } from "react-hook-form"
import { yupResolver } from "@hookform/resolvers/yup"
import InputField from "../../RegisterSaas/Components/InputField"
import { useDispatch, useSelector } from "react-redux"
import { userActions } from "../../../reducers/Users/userSlice"
import { rolesUser } from "../../../constants/DataWorkspace"
import {regexEmail} from '../../Workspaces/components/ModalAddWorkspace';
import { useState } from "react"

export const regexPassword =
   /^(?=.*[A-Z])(?=.*\d)(?=.*[#^()@$!%*?&])[A-Za-z\d#^()@$!%*?&]{8,15}$/
const ModalAddUser = ({ isShow, handleClose }) => {

   const dispatch = useDispatch()

   const loadingCreateUser = useSelector(store => store.user.loadingCreateUser)

   const schemaResolver = yupResolver(
      yup.object().shape({
         email: yup.string().required("Email is required").test("check-email", "Email is invalid", (value) => {
            const valueTrim = value?.trim()
            if (!regexEmail.test(valueTrim)) {
               return false
            }
            return true
         }),
         password: yup
            .string()
            .test(
               "check-valid-password",
               "Password must be at least 8 characters, contain special characters, numbers, uppercase, lowercase letters and max 15 characters",
               (value) => {
                  if (!regexPassword.test(value)) {
                     return false
                  }
                  return true
               }
            )
            .required(),
         confirmPassword: yup
            .string()
            .required("Confirm Password is required")
            .test('passwords-match', 'Confirm password not match', function(value){
               return this.parent.password === value
            }),
         fullName: yup.string().required("Full Name is required"),
         bio: yup.string(),
         role: yup.string().required(),
      })
   )
   const methods = useForm({
      resolver: schemaResolver,
      mode: "all",
      defaultValues: {
         role: rolesUser.customer,
         fullName: "",
      },
   })
   const {
      handleSubmit,
      // register,
      formState: { errors },
      // setError,
      watch,
      reset,
      setValue,
   } = methods

   const onSubmit = (values) => {
      dispatch(
         userActions.createNewUser({
            email: values.email?.trim(),
            password: values.password,
            fullName: values.fullName?.trim(),
            bio: values.bio?.trim(),
            role: values.role,
            callback: () => {
               reset()
               handleClose()
            },
         })
      )
   }

   return (
      <Modal
         title={"Add new user"}
         centered
         open={isShow}
         onCancel={handleClose}
         onOk={handleSubmit(onSubmit)}
         confirmLoading={loadingCreateUser}
      >
         <form autocomplete="off" onSubmit={handleSubmit(onSubmit)}>
            <div className="mt-3">
               <InputField
                  label="Email*"
                  setValue={setValue}
                  errors={errors}
                  name="email"
                  inputProps={{
                     type: "search",
                     autoComplete: "off",
                  }}
               />
            </div>
            <div className="mt-3">
               <InputField
                  label="Password*"
                  setValue={setValue}
                  errors={errors}
                  name="password"
                  inputProps={{
                     type: "password",
                     autocomplete: "new-password"
                  }}
               />
            </div>
            <div className="mt-3">
               <InputField
                  label="Confirm Password*"
                  setValue={setValue}
                  errors={errors}
                  name="confirmPassword"
                  inputProps={{
                     type: "password",
                     autocomplete: "new-password"
                  }}
               />
            </div>
            <div className="mt-3">
               <Checkbox
                  onChange={(value) => {
                     if (value.target.checked) {
                        setValue("role", rolesUser.superadmin)
                     } else {
                        setValue("role", rolesUser.customer)
                     }
                  }}
               >
                  ADMIN
               </Checkbox>
            </div>
            <div className="mt-3">
               <InputField
                  label="Full Name"
                  setValue={setValue}
                  errors={errors}
                  name="fullName"
                  watch={watch}
                  inputProps={{
                     maxLength: 100,
                  }}
               />
            </div>
            <div className="mt-3">
               <InputField
                     label="Company Name"
                     setValue={setValue}
                     errors={errors}
                     name="companyName"
                     watch={watch}
                     /> 
            </div>
            <div className="mt-3">
               <InputField
                     label="Address"
                     setValue={setValue}
                     errors={errors}
                     name="address"
                     watch={watch}
                  />
            </div>
            <div className="mt-3">
               <InputField 
                     label="Phone Number"
                     setValue={setValue}
                     errors={errors}
                     name="phoneNumber"
                     watch={watch}
                  /> 
            </div>
            <div className="mt-3">
            <InputField
                  label="Website"
                  setValue={setValue}
                  errors={errors}
                  name="website"
                  watch={watch}
                  inputProps={{
                     addonBefore: "https://"
                  }}
               />
            </div>
            <div className="mt-3">
               <InputField
                  label="Bio"
                  setValue={setValue}
                  errors={errors}
                  name="bio"
                  inputProps={{
                     type: "textarea",
                  }}
               />
            </div>
         </form>
      </Modal>
   )
}

export default ModalAddUser
