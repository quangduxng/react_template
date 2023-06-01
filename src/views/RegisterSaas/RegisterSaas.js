import React from "react"
import * as yup from "yup"
import { useForm } from "react-hook-form"
import { yupResolver } from "@hookform/resolvers/yup"
import { AppImages } from "../../assets/images"
import "./styles.scss"
import { Button } from "antd"
import InputField from "./Components/InputField"
import {
   optionsCountry,
   optionsIndustry,
   optionsLanguage,
   optionsRegion,
   optionsSize,
   optionsType,
} from "../../constants/formOptions"
import CascaderField from "./Components/CascaderField"
import { useDispatch, useSelector } from "react-redux"
import { workspaceActions } from "../../reducers/Workspaces/workspaceSlice"
import moment from "moment"
import { useHistory } from "react-router-dom"
import { regexPassword } from "../Users/components/ModalAddUser"
import { regexDomain, regexEmail } from "../Workspaces/components/ModalAddWorkspace"
import {SCREEN_NAME} from '../../constants/screens';

const RegisterSaas = () => {
   const dispatch = useDispatch()
   const history = useHistory()

   const loadingRegisterSaas = useSelector(
      (store) => store.workspace.loadingRegisterSaas
   )

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
            .required("Admin Password is required")
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
         // emailAdmin: yup.string().required().email(),
      })
   )

   const methods = useForm({
      resolver: schemaResolver,
      mode: "all",
      defaultValues: {
         serverRegion: "US",
         language: "vi",
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
      // console.log("onSubmit ~ values", values)
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
               expired_date: moment().utc(true).add(13, "days").hour(0).minute(0).second(0).format(),
               organization_email: values.organizationEmail.trim(),
               organization_name: values.organizationName?.trim().toLowerCase(),
               organization_type: values.type,
               organization_industry: values.industry,
               organization_size: values.size,
               organization_country: values.country,
            },
            callback: () => {
               history.push(SCREEN_NAME.SUCCESS_REGISTER_SAAS, {
                  email: values.organization_email,
               })
            },
            history,
            isGetWorkspace: false,
         })
      )
   }

   return (
      <div className="register-saas">
         <div className="col-12 col-md-8 col-xl-6 col-xxl-6 d-flex justify-content-center flex-column">
            <div className="text-center">
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
               className="col-12 col-md-4 col-xl-8 d-flex align-self-center flex-column pb-4"
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
                     />
                  </div>
                  <div className="group-input">
                     <InputField
                        label="Workspace name*"
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
                  <div className="d-flex align-items-center justify-content-space-between">
                     <div className="group-input d-flex flex-column flex-fill">
                        <CascaderField
                           label="Server region*"
                           setValue={setValue}
                           name="serverRegion"
                           style={{ width: "100%" }}
                           options={optionsRegion}
                           defaultValue="US"
                           errors={errors}
                        />
                     </div>
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
               <div className="group-input-container">
                  <div className="title-group">Organization Info</div>
                  <div className="description-group">
                     This will help us to improve your experience.
                  </div>
                  <div className="group-input">
                     <InputField
                        label="Organization Name*"
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
                     />
                  </div>
                  <div className="group-input">
                     <CascaderField
                        label="Industry*"
                        setValue={setValue}
                        name="industry"
                        style={{ width: "100%" }}
                        options={optionsIndustry}
                        errors={errors}
                        cascaderProps={{
                           placeholder: "Select",
                        }}
                     />
                  </div>
                  <div className="group-input">
                     <CascaderField
                        label="Size*"
                        setValue={setValue}
                        name="size"
                        style={{ width: "100%" }}
                        options={optionsSize}
                        errors={errors}
                        cascaderProps={{
                           placeholder: "Select",
                        }}
                     />
                  </div>
                  <div className="group-input">
                     <CascaderField
                        label="Country*"
                        setValue={setValue}
                        name="country"
                        style={{ width: "100%" }}
                        options={optionsCountry}
                        errors={errors}
                        cascaderProps={{
                           placeholder: "Select",
                        }}
                     />
                  </div>
               </div>
               <div className="group-input-container">
                  <div className="title-group">New admin account</div>
                  <div className="description-group">
                     This will be your admin user for new workspace
                  </div>
                  <div className="group-input">
                     <InputField
                        label="Admin Username*"
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
                        label="Admin Password*"
                        setValue={setValue}
                        errors={errors}
                        name="password"
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
                  Submit
               </Button>
            </form>
         </div>
      </div>
   )
}

export default RegisterSaas
