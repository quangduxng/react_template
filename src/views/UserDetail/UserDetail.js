import { Button, Checkbox, Skeleton, Typography } from "antd"
import React, { useEffect, useState } from "react"
import * as yup from "yup"
import { useForm } from "react-hook-form"
import { yupResolver } from "@hookform/resolvers/yup"
import InputField from "../RegisterSaas/Components/InputField"
import "./styles.scss"
import { useDispatch, useSelector } from "react-redux"
import { userActions } from "../../reducers/Users/userSlice"
import { useHistory, useParams } from "react-router-dom"
import { rolesUser } from "../../constants/DataWorkspace"

const UserDetail = () => {
   const dispatch = useDispatch()
   const { id } = useParams()
   console.log("UserDetail ~ id", id)
   const schemaResolver = yupResolver(
      yup.object().shape({
         fullName: yup.string().required(),
         bio: yup.string(),
         // password: yup.string().required(),
         email: yup.string().required(),
         role: yup.string().required(),
         company: yup.string(),
         company_address: yup.string(),
         phone: yup.string(),
         website: yup.string(),
      })
   )

   const history = useHistory()

   const methods = useForm({
      resolver: schemaResolver,
      mode: "all",
      defaultValues: {
         fullName: "",
      },
   })

   const currentUserDetail = useSelector(
      (store) => store.user.currentUserDetail
   )
   const loadingUserDetail = useSelector(
      (store) => store.user.loadingUserDetail
   )
   const loadingUpdateUserDetail = useSelector(
      (store) => store.user.loadingUpdateUserDetail
   )

   // const location = useLocation()

   useEffect(() => {
      dispatch(
         userActions.getUserDetail({
            id,
         })
      )
   }, [id, dispatch])

   const {
      handleSubmit,
      // register,
      formState: { errors },
      // setError,
      watch,
      setValue,
   } = methods

   useEffect(() => {
      if (currentUserDetail) {
         setValue("fullName", currentUserDetail.fullname)
         setValue("bio", currentUserDetail.bio)
         setValue("email", currentUserDetail.email)
         setValue("role", currentUserDetail.role)
         setValue("company", currentUserDetail.company)
         setValue("company_address", currentUserDetail.company_address)
         setValue("phone", currentUserDetail.phone)
         setValue("website", currentUserDetail.website)
      }
   }, [currentUserDetail, setValue])

   const onSubmit = (values) => {
      dispatch(
         userActions.updateUserDetail({
            id,
            params: {
               fullname: values.fullName?.trim(),
               bio: values.bio?.trim(),
               role: values.role,
               company: values.company?.trim(),
               company_address: values.company_address?.trim(),
               phone: values.phone?.trim(),
               website: values.website?.trim(),
            },
            callbackDispatch: () => {},
         })
      )
   }

   if (loadingUserDetail) {
      return (
         <div className="profile-page col-12 ml-4 col-sm-10 col-md-10 col-lg-8 col-xl-6">
            <Skeleton loading paragraph />
         </div>
      )
   }

   return (
      <form
         onSubmit={handleSubmit(onSubmit)}
         className="profile-page col-12 ml-4 col-sm-10 col-md-10 col-lg-8 col-xl-6"
      >
         <div className="d-flex align-items-center justify-content-between">
            <div className="d-flex align-items-center">
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
               <Typography.Title
                  level={3}
                  style={{ margin: 0, marginLeft: 24 }}
               >
                  User Detail
               </Typography.Title>
            </div>
         </div>
         <div className="mt-4">
            <div className="d-flex align-items-center justify-content-between ">
               <InputField
                  inputProps={{
                     // disabled: true,
                     readOnly: true,
                     value: watch("email"),
                     size: "middle",
                  }}
                  label="Email"
                  setValue={setValue}
                  errors={errors}
                  name="email"
                  className="d-flex flex-column flex-fill"
               />
               <InputField
                  label="Full Name"
                  setValue={setValue}
                  errors={errors}
                  name="fullName"
                  watch={watch}
                  inputProps={{
                     value: watch("fullName"),
                     size: "middle",
                     maxLength: 100,
                  }}
                  className="d-flex flex-column flex-fill ml-4"
               />
            </div>
            {/* <InputField
               label="Date Created"
               setValue={setValue}
               errors={errors}
               name="dateCreated"
               watch={watch}
               inputProps={{
                  value: "23/05/2022",
                  size: "middle",
                  readOnly: true,
               }}
               className="d-flex flex-column flex-fill mt-4"
            /> */}
            <InputField
               label="Company Name"
               setValue={setValue}
               errors={errors}
               name="company"
               watch={watch}
               inputProps={{
                  value: watch("company"),
                  size: "middle",
                  maxLength: 100,
               }}
               className="d-flex flex-column flex-fill mt-4"
            />
            <InputField
               label="Company Address"
               setValue={setValue}
               errors={errors}
               name="company_address"
               watch={watch}
               className="d-flex flex-column flex-fill mt-4"
               inputProps={{
                  value: watch("company_address"),
                  size: "middle",
                  maxLength: 100,
               }}
            />
            <InputField
               label="Phone Number"
               setValue={setValue}
               errors={errors}
               name="phone"
               watch={watch}
               className="d-flex flex-column flex-fill mt-4"
               inputProps={{
                  type: "number",
                  value: +watch("phone")
               }}
            />
            <InputField
               label="Website"
               setValue={setValue}
               errors={errors}
               name="website"
               watch={watch}
               className="d-flex flex-column flex-fill mt-4"
               inputProps={{
                  value: watch("website"),
                  size: "middle",
                  maxLength: 100,
               }}
            />
            <InputField
               className="mt-3"
               label="Bio"
               setValue={setValue}
               errors={errors}
               name="bio"
               inputProps={{ type: "textarea", value: watch("bio") }}
            />
            <div className="mt-3">
               <Checkbox
                  checked={watch("role") === rolesUser.customer ? false : true}
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
            {/* <InputField
               className="mt-3"
               label="New Password"
               setValue={setValue}
               errors={errors}
               name="password"
               inputProps={{
                  size: 'middle'
               }}
            /> */}
         </div>
         <div className="w-100 d-flex justify-content-center mt-3">
            <Button
               loading={loadingUpdateUserDetail}
               htmlType="submit"
               type="primary"
               size="large"
               // className=''
            >
               Save changes
            </Button>
         </div>
      </form>
   )
}

export default UserDetail
