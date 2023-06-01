import { Button, Typography } from "antd"
import React, { useEffect, useState } from "react"
import * as yup from "yup"
import { useForm } from "react-hook-form"
import { yupResolver } from "@hookform/resolvers/yup"
import InputField from "../RegisterSaas/Components/InputField"
import "./styles.scss"
import { useDispatch, useSelector } from "react-redux"
import { userActions } from "../../reducers/Users/userSlice"
import { getUserId } from "../../utils/token"
import { authActions } from "../../reducers/Auth/authSlice"
import { useHistory } from "react-router"
const regexPassword =
   /^(?=.*[A-Z])(?=.*\d)(?=.*[#^()@$!%*?&])[A-Za-z\d#^()@$!%*?&]{8,}$/

const Profile = () => {
   const dispatch = useDispatch()
   const history = useHistory()
   const schemaResolver = yupResolver(
      yup.object().shape({
         fullName: yup.string().required("Full Name is required"),
         bio: yup.string(),
         // password: yup.string().required(),
         email: yup.string().required("Email is required"),
         company: yup.string(),
         company_address: yup.string(),
         phone: yup.string(),
         website: yup.string(),
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
   const loadingUpdateUserDetail = useSelector(
      (store) => store.user.loadingUpdateUserDetail
   )

   const {
      handleSubmit,
      // register,
      formState: { errors },
      setError,
      watch,
      setValue,
   } = methods

   useEffect(() => {
      if (user) {
         setValue("fullName", user.fullname)
         setValue("bio", user.bio)
         setValue("email", user.email)
         setValue("company", user.company)
         setValue("company_address", user.company_address)
         setValue("phone", user.phone)
         setValue("website", user.website)
      }
   }, [user, setValue])

   const onSubmit = (values) => {
      dispatch(
         userActions.updateUserDetail({
            id: getUserId(),
            params: {
               fullname: values.fullName.trim(),
               bio: values.bio?.trim(),
               company: values.company?.trim(),
               company_address: values.company_address?.trim(),
               phone: values.phone?.trim(),
               website: values.website?.trim(),
            },
            callbackDispatch: authActions.getUser(),
         })
      )
      // dispatch(
      //    authActions.login({
      //       email: values.email,
      //       password: values.password,
      //       history,
      //    })
      // )
   }

   return (
      <div className="profile-page col-12 col-sm-10 col-md-10 col-lg-8 col-xl-12">
         {/* <div className="row justify-content-around"> */}
         <form
            onSubmit={handleSubmit(onSubmit)}
            className="col-12 ml-4 col-sm-10 col-md-10 col-lg-8 col-xl-4"
         >
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
                  Profile
               </Typography.Title>
            </div>
            <div></div>
            <div className="mt-4">
               <InputField
                  inputProps={{
                     // disabled: true,
                     value: watch("email"),
                     size: "middle",
                     readOnly: true,
                  }}
                  label="Email"
                  setValue={setValue}
                  errors={errors}
                  name="email"
                  className="d-flex flex-column flex-fill mt-3"
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
                  className="d-flex flex-column flex-fill mt-3"
               />
               {/* <InputField
                     inputProps={{
                        // disabled: true,
                        value: "23/03/2023",
                        size: "middle",
                        readOnly: true,
                     }}
                     label="Date Created"
                     setValue={setValue}
                     errors={errors}
                     name="dateCreated"
                     className="d-flex flex-column flex-fill mt-3"
                  /> */}
               <InputField
                  label="Company Name"
                  setValue={setValue}
                  errors={errors}
                  name="company"
                  watch={watch}
                  className="d-flex flex-column flex-fill mt-3"
                  inputProps={{
                     value: watch("company"),
                     size: "middle",
                     maxLength: 100,
                  }}
               />

               <InputField
                  label="Company Address"
                  setValue={setValue}
                  errors={errors}
                  name="company_address"
                  watch={watch}
                  className="d-flex flex-column flex-fill mt-3"
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
                  className="d-flex flex-column flex-fill mt-3"
                  inputProps={{
                     value: +watch("phone"),
                     size: "middle",
                     type: "number",
                  }}
               />
               <InputField
                  label="Website"
                  setValue={setValue}
                  errors={errors}
                  name="website"
                  watch={watch}
                  className="d-flex flex-column flex-fill mt-3"
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
            <div className="w-100 d-flex justify-content-center mt-4">
               <Button
                  loading={loadingUpdateUserDetail}
                  htmlType="submit"
                  type="primary"
                  size="large"
                  className="mt-2 float-right"
               >
                  Save changes
               </Button>
            </div>
         </form>
         {/* </div> */}
      </div>
   )
}

export default Profile
