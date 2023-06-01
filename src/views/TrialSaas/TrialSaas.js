import React, { useEffect, useState } from "react"
import * as yup from "yup"
import { useForm } from "react-hook-form"
import { yupResolver } from "@hookform/resolvers/yup"
import { AppImages } from "../../assets/images"
import "./styles.scss"
import { Button } from "antd"
import {
   optionsCountry,
   optionsIndustry,
   optionsLanguage,
   optionsRegion,
   optionsSize,
   optionsType,
} from "../../constants/formOptions"
import { useDispatch, useSelector } from "react-redux"
import { workspaceActions } from "../../reducers/Workspaces/workspaceSlice"
import moment from "moment"
import { useHistory } from "react-router-dom"
import { regexPassword } from "../Users/components/ModalAddUser"
import {
   regexDomain,
   regexEmail,
} from "../Workspaces/components/ModalAddWorkspace"
import { SCREEN_NAME } from "../../constants/screens"
import { rolesUser } from "../../constants/DataWorkspace"
import ModalLoadingCreateWorkspace from "./Components/ModalLoadingCreateWorkspace"
import InputField from "../RegisterSaas/Components/InputField"
import CascaderField from "../RegisterSaas/Components/CascaderField"

const TrialSaas = () => {
   const dispatch = useDispatch()
   const history = useHistory()

   const loadingRegisterSaas = useSelector(
      (store) => store.workspace.loadingRegisterSaas
   )
   const user = useSelector((store) => store.auth.user)

   const currentInitializingWorkspace = useSelector(
      (store) => store.workspace.currentInitializingWorkspace
   )

   const [isShowModalLoading, setIsShowModalLoading] = useState(false)

   useEffect(() => {
      if (currentInitializingWorkspace.id) {
         setIsShowModalLoading(true)
      }
   }, [currentInitializingWorkspace.id])

   const schemaResolver = yupResolver(
      yup.object().shape({
         organizationEmail: yup
            .string()
            .required("Organization Email is required")
            .test("check-email", "Organization Email is invalid", (value) => {
               const valueTrim = value?.trim()
               if (!regexEmail.test(valueTrim)) {
                  return false
               }
               return true
            }),
         workspaceName: yup.string().required("Workspace Name is required"),
         workspaceUrl: yup
            .string()
            .required("Workspace Url is required")
            .test(
               "check-valid-domain",
               "Workspace Url must be at least 3 characters and not contain special character or space at the first and end position",
               (value) => {
                  if (!regexDomain.test(value) || value?.length < 3) {
                     return false
                  }
                  return true
               }
            ),
         serverRegion: yup.string(),
         language: yup.string(),
         // agreePolicy: yup.bool().required(),
         // receiveNews: yup.bool(),
         organizationName: yup
            .string()
            .required("Organization Name is required"),
         type: yup.string().required("Type is required"),
         industry: yup.string().required("Industry is required"),
         size: yup.string().required("Size is required"),
         country: yup.string().required("Country is required"),
         username: yup.string().required("Admin Username is required"),
         password: yup
            .string()
            .required("Password is required")
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
         passwordConfirmation: yup
            .string()
            .required("Confirm Password is required")
            .test("passwords-match", "Passwords must match", function (value) {
               return this.parent.password === value
            }),
         // emailAdmin: yup.string().required().email(),
      })
   )

   const methods = useForm({
      resolver: schemaResolver,
      mode: "all",
      defaultValues: {
         serverRegion: "US",
         language: "vi",
         type: optionsType[0].value,
         industry: optionsIndustry[0].value,
         size: optionsSize[0].value,
         country: optionsCountry[0].value,
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

   useEffect(() => {
      if (user?.role === rolesUser.customer) {
         setValue("organizationEmail", user.email)
      }
   }, [user, setValue])

   const onSubmit = (values) => {
      console.log("onSubmit ~ values", values)
      dispatch(
         workspaceActions.registerSaas({
            params: {
               usernameAdmin: values.username.trim(),
               passwordAdmin: values.password,
               // emailAdmin: values.emailAdmin,
               name: values.workspaceName.trim(),
               url: values.workspaceUrl.trim(),
               server_region: values.serverRegion,
               language: values.language,
               expired_date: moment()
                  .utc(true)
                  .add(1, 'month')
                  .hour(0)
                  .minute(0)
                  .second(0)
                  .format(),
               organization_email: values.organizationEmail.trim(),
               organization_name: values.organizationName?.trim().toLowerCase(),
               organization_type: values.type,
               organization_industry: values.industry,
               organization_size: values.size,
               organization_country: values.country,
            },
            callback: (id) => {
               dispatch(
                  workspaceActions.setCurrentInitalizingWorkspace({
                     status: null,
                     id,
                  })
               )
            },
            history,
            isGetWorkspace: false,
            isNotShowNotify: true,
         })
      )
   }

   const filter = (inputValue, path) =>
      path.some(
         (option) =>
            option.label.toLowerCase().indexOf(inputValue.toLowerCase()) > -1
      )

   return (
      <div className="trial-saas">
         <div className="col-12 col-md-12 col-xl-8 col-xxl-8 d-flex justify-content-center flex-column">
            <div className="text-center mt-5">
               <img
                  src={AppImages.logoWorkcecPNG}
                  width={200}
                  height={200}
                  alt="workcec"
               />
               {/* <div className="title-large">
                  Send your first message{" "}
                  <span style={{ color: "#F79F1F" }}>in minutes.</span>
               </div>
               <div className="title-small">
                  Free for 30 days. Afterwards, choose between continuing to
                  host on our secure cloud or migrate to your private cloud,
                  data center or even air-gapped environment.
               </div> */}
            </div>
            <form
               className="col-12 col-md-12 col-xl-8 d-flex align-self-center flex-column pb-4"
               onSubmit={handleSubmit(onSubmit)}
            >
               <div className="group-input-container">
                  <div className="group-input">
                     <InputField
                        label="Organization Email*"
                        setValue={setValue}
                        errors={errors}
                        name="organizationEmail"
                        inputProps={{
                           value: watch("organizationEmail"),
                        }}
                        hint="Please use a work email"
                     />
                  </div>
                  <div className="group-input">
                     <InputField
                        label="Workspace name*"
                        className={"style-lable"}
                        setValue={setValue}
                        errors={errors}
                        name="workspaceName"
                        watch={watch}
                        inputProps={{
                           maxLength: 100,
                        }}
                     />
                  </div>
                  <div className="group-input">
                     <InputField
                        label="Workspace URL*"
                        className={"style-lable"}
                        setValue={setValue}
                        errors={errors}
                        name="workspaceUrl"
                        // inputProps={{
                        //    addonAfter: ".workcec.com",
                        // }}
                     />
                  </div>

                  {watch("workspaceUrl")?.length > 0 && (
                     <div className="full-url">
                        https://{watch("workspaceUrl")}.workcec.com
                     </div>
                  )}
               </div>
               <div className="group-input-container style-lable">
                  <div className="title-group">Organization Info</div>
                  <div className="description-group">
                     This will help us to improve your experience.
                  </div>
                  {/* <div className="group-input">
                     <InputField
                        className={"style-lable"}
                        label="Organization Email*"
                        setValue={setValue}
                        errors={errors}
                        name="organizationEmail"
                        inputProps={{
                           value: watch("organizationEmail"),
                        }}
                     />
                  </div> */}
                  <div className="group-input">
                     <InputField
                        label="Organization Name*"
                        className={"style-lable"}
                        setValue={setValue}
                        errors={errors}
                        name="organizationName"
                        watch={watch}
                        inputProps={{
                           maxLength: 100,
                        }}
                     />
                  </div>
                  <div className="group-input">
                     <CascaderField
                        label="Type*"
                        setValue={setValue}
                        name="type"
                        style={{ width: "100%" }}
                        options={optionsType}
                        errors={errors}
                        cascaderProps={{
                           placeholder: "Select",
                        }}
                        value={watch("type")}
                     />
                  </div>
                  <div className="group-input">
                     <CascaderField
                        label="Industry*"
                        className={"style-lable"}
                        setValue={setValue}
                        name="industry"
                        style={{ width: "100%" }}
                        options={optionsIndustry}
                        errors={errors}
                        cascaderProps={{
                           placeholder: "Select",
                        }}
                        value={watch("industry")}
                     />
                  </div>
                  <div className="group-input">
                     <CascaderField
                        label="Size*"
                        className={"style-lable"}
                        setValue={setValue}
                        name="size"
                        style={{ width: "100%" }}
                        options={optionsSize}
                        errors={errors}
                        cascaderProps={{
                           placeholder: "Select",
                        }}
                        value={watch("size")}
                     />
                  </div>
                  <div className="group-input">
                     <CascaderField
                        label="Country*"
                        className={"style-lable"}
                        setValue={setValue}
                        name="country"
                        style={{ width: "100%" }}
                        options={optionsCountry}
                        errors={errors}
                        cascaderProps={{
                           placeholder: "Select",
                        }}
                        value={watch("country")}
                        showSearch={{ filter }}
                     />
                  </div>
                  <div className="d-flex align-items-center justify-content-space-between">
                     {/* //serverRegion */}
                     {/* <div className="group-input d-flex flex-column flex-fill">
                        <CascaderField
                           label="Server region*"
                           className={"style-lable"}
                           setValue={setValue}
                           name="serverRegion"
                           style={{ width: "100%" }}
                           options={optionsRegion}
                           defaultValue="US"
                           errors={errors}
                        />
                     </div> */}

                     {/* <div className="group-input d-flex flex-column flex-fill">
                  <CascaderField
                     label="Language*"
                     setValue={setValue}
                     style={{ width: "90%" }}
                     name="language"
                     options={optionsLanguage}
                     defaultValue="vi"
                     errors={errors}
                  />
               </div> */}
                  </div>
               </div>
               <div className="group-input-container style-lable">
                  <div className="title-group">Create admin account</div>
                  <div className="description-group">
                     This will be your admin user for new workspace
                  </div>
                  <div className="group-input">
                     <InputField
                        label="Username*"
                        className={"style-lable"}
                        setValue={setValue}
                        errors={errors}
                        name="username"
                        watch={watch}
                        inputProps={{
                           autoComplete: "off",
                           maxLength: 100,
                        }}
                     />
                  </div>
                  <div className="group-input">
                     <InputField
                        label="Password*"
                        className={"style-lable"}
                        setValue={setValue}
                        errors={errors}
                        name="password"
                        inputProps={{
                           type: "password",
                           autoComplete: "off",
                        }}
                     />
                  </div>
                  <div className="group-input">
                     <InputField
                        label=" Confirm password*"
                        className={"style-lable"}
                        setValue={setValue}
                        errors={errors}
                        name="passwordConfirmation"
                        inputProps={{
                           type: "password",
                           autoComplete: "off",
                        }}
                     />
                  </div>
               </div>

               <Button
                  className="button-submit"
                  loading={loadingRegisterSaas}
                  htmlType="submit"
                  type="primary"
               >
                  Create
               </Button>
            </form>
         </div>
         <ModalLoadingCreateWorkspace
            isShow={isShowModalLoading}
            handleClose={() => setIsShowModalLoading(false)}
            linkRedirect={`https://${watch("workspaceUrl")}.workcec.com`}
         />
      </div>
   )
}

export default TrialSaas
