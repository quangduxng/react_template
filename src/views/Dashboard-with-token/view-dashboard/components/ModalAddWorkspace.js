import { Modal } from "antd"
import React, { useEffect } from "react"
import * as yup from "yup"
import { useForm } from "react-hook-form"
import { yupResolver } from "@hookform/resolvers/yup"
import InputField from "../../RegisterSaas/Components/InputField"
import { useDispatch, useSelector } from "react-redux"
import CascaderField from "../../RegisterSaas/Components/CascaderField"
import {
   optionsCountry,
   optionsIndustry,
   optionsRegion,
   optionsSize,
   optionsType,
} from "../../../constants/formOptions"
import "../styles.scss"
import { workspaceActions } from "../../../reducers/Workspaces/workspaceSlice"
import moment from "moment"
import { rolesUser } from "../../../constants/DataWorkspace"
import { regexPassword } from "../../Users/components/ModalAddUser"

export const regexDomain = /^[a-zA-Z0-9][a-zA-Z0-9-]{1,61}[a-zA-Z0-9]$/

export const regexEmail =
   // eslint-disable-next-line no-useless-escape
   /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/

const ModalAddWorkspace = ({ isShow, handleClose }) => {
   const dispatch = useDispatch()

   const user = useSelector((store) => store.auth.user)
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
         confirmPassword: yup
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
                  .add(13, "days")
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
            callback: () => {
               reset()
               handleClose()
            },
            isGetWorkspace: true,
            // history,
         })
      )
   }

   const filter = (inputValue, path) =>
      path.some(
         (option) =>
            option.label.toLowerCase().indexOf(inputValue.toLowerCase()) > -1
      )

   return (
      <Modal
         title={"Add new workspace"}
         centered
         open={isShow}
         onCancel={handleClose}
         onOk={handleSubmit(onSubmit)}
         okButtonProps={{ loading: loadingRegisterSaas }}
         className="modal-add-workspace"
      >
         <form className='form-container' onSubmit={handleSubmit(onSubmit)}>
            {/* <div style={{ marginTop: 0 }} className="group-input-container"> */}
            <div className="group-input">
               <InputField
                  label="Organization Email*"
                  setValue={setValue}
                  errors={errors}
                  name="organizationEmail"
                  inputProps={{
                     // disabled: user?.role === rolesUser.customer,
                     value: watch("organizationEmail"),
                  }}
                  hint="Please use a work email"
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
               {/* <div className="group-input d-flex flex-column flex-fill">
                  <CascaderField
                     label="Server region*"
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

            {/* <div className="group-input">
                     <Checkbox
                        onChange={(value) => {
                           setValue("agreePolicy", value.target.checked)
                        }}
                     >
                        By submitting this form, you agree with our Privacy
                        Policy.*
                     </Checkbox>
                  </div>
                  <div className="group-input">
                     <Checkbox
                        onChange={(value) => {
                           setValue("receiveNews", value.target.checked)
                        }}
                     >
                        Keep me informed about news and events
                     </Checkbox>
                  </div> */}
            {/* </div> */}
            {/* <div className="group-input-container">
                  <div className="title-group">Organization Info</div>
                  <div className="description-group">
                     This will help us to improve your experience.
                  </div> */}
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
                  value={watch("type")}
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
                  value={watch("industry")}
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
                  value={watch("size")}
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
                  value={watch("country")}
                  showSearch={{ filter }}
               />
            </div>
            {/* </div> */}
            {/* <div className="group-input-container"> */}
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
            {/* <div className="group-input">
               <InputField
                  label="Admin Email"
                  setValue={setValue}
                  errors={errors}
                  name="emailAdmin"
                  inputProps={{
                     autoComplete: "off",
                  }}
               />
            </div> */}
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
            <div className="group-input">
               <InputField
                  label="Confirm Password*"
                  setValue={setValue}
                  errors={errors}
                  name="confirmPassword"
                  inputProps={{
                     type: "password",
                     autoComplete: "off",
                  }}
               />
            </div>
            {/* </div> */}
         </form>
      </Modal>
   )
}

export default ModalAddWorkspace
