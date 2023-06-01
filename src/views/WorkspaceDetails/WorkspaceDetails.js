import { Button, Skeleton, Typography } from "antd"
import React, { useEffect } from "react"
import { useHistory, useParams } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import * as yup from "yup"
import { useForm } from "react-hook-form"
import { yupResolver } from "@hookform/resolvers/yup"
import { workspaceActions } from "../../reducers/Workspaces/workspaceSlice"
import InputField from "../RegisterSaas/Components/InputField"
import {
   optionsCountry,
   optionsIndustry,
   optionsSize,
   optionsType,
} from "../../constants/formOptions"
import "./styles.scss"
import moment from "moment"
import CascaderField from "../RegisterSaas/Components/CascaderField"
import { rolesUser, statusWorkspace } from "../../constants/DataWorkspace"
const WorkspaceDetails = () => {
   const { id } = useParams()
   const dispatch = useDispatch()

   const currentWorkspaceDetail = useSelector(
      (store) => store.workspace.currentWorkspaceDetail
   )
   const loadingWorkspaceDetail = useSelector(
      (store) => store.workspace.loadingWorkspaceDetail
   )
   const loadingUpdateWorkspace = useSelector(
      (store) => store.workspace.loadingUpdateWorkspace
   )
   const user = useSelector((store) => store.auth.user)

   const history = useHistory()

   useEffect(() => {
      dispatch(
         workspaceActions.getWorkspaceDetail({
            id,
         })
      )
   }, [dispatch, id])

   const schemaResolver = yupResolver(
      yup.object().shape({
         organizationEmail: yup.string(),
         rootUserName: yup.string(),
         rootPassword: yup.string(),
         name: yup.string().required("Workspace Name is required"),
         url: yup.string().required("Workspace Url is required"),
         // password: yup.string().required(),
         region: yup.string(),
         organizationName: yup
            .string()
            .required("Organization Name is required"),
         type: yup.string().required("Type is required"),
         industry: yup.string().required("Industry is required"),
         size: yup.string().required("Size is required"),
         country: yup.string().required("Country is required"),
      })
   )
   const methods = useForm({
      resolver: schemaResolver,
      mode: "all",
   })
   const {
      handleSubmit,
      // register,
      formState: { errors },
      // setError,
      watch,
      setValue,
   } = methods

   const onSubmit = (values) => {
      dispatch(
         workspaceActions.updateWorkspaceDetail({
            id,
            params: {
               name: values.name,
               url: values.url,
               // region: values.region,
               organization_name: values.organizationName,
               organization_type: values.type,
               organization_industry: values.industry,
               organization_size: values.size,
               organization_country: values.country,
            },
         })
      )
   }

   useEffect(() => {
      if (currentWorkspaceDetail) {
         setValue("name", currentWorkspaceDetail.name)
         setValue("url", currentWorkspaceDetail.url)
         setValue("region", currentWorkspaceDetail.server_region)
         setValue("organizationName", currentWorkspaceDetail.organization_name)
         setValue("type", currentWorkspaceDetail.organization_type)
         setValue("industry", currentWorkspaceDetail.organization_industry)
         setValue("size", currentWorkspaceDetail.organization_size?.toString())
         setValue("country", currentWorkspaceDetail.organization_country)
         setValue(
            "organizationEmail",
            currentWorkspaceDetail.organization_email
         )
         setValue("rootPassword", currentWorkspaceDetail.root_pwd)
         setValue("rootUserName", currentWorkspaceDetail.root_name)
      }
   }, [currentWorkspaceDetail, setValue])

   const isDisableField =
      moment(currentWorkspaceDetail?.expire_date).isAfter(moment()) ||
      currentWorkspaceDetail?.status === statusWorkspace.deleted

   if (loadingWorkspaceDetail) {
      return (
         <div className="workspace-settings col-12 ml-4 col-sm-10 col-md-10 col-lg-8 col-xl-6">
            <Skeleton loading paragraph />
         </div>
      )
   }

   return (
      <form
         onSubmit={handleSubmit(onSubmit)}
         className="workspace-details col-12 ml-4 col-sm-10 col-md-10 col-lg-8 col-xl-6"
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
                  Workspace Settings
               </Typography.Title>
            </div>
         </div>
         <div className="mt-4">
            <InputField
               inputProps={{
                  disabled: true,
                  value: watch("organizationEmail"),
                  size: "middle",
               }}
               label="Organization Email"
               setValue={setValue}
               errors={errors}
               name="organizationEmail"
               className="d-flex flex-column flex-fill"
            />
         </div>
         <div className="mt-3">
            <InputField
               label="Name"
               setValue={setValue}
               errors={errors}
               name="name"
               inputProps={{
                  value: watch("name"),
                  size: "middle",
                  disabled: isDisableField,
               }}
               className="d-flex flex-column flex-fill"
            />
         </div>
         {/* {user.role === rolesUser.superadmin && (
            <>
               <div className="mt-3">
                  <InputField
                     label="Root Username"
                     setValue={setValue}
                     errors={errors}
                     name="rootUserName"
                     inputProps={{
                        value: watch("rootUserName"),
                        size: "middle",
                        disabled: true,
                     }}
                     className="d-flex flex-column flex-fill"
                  />
               </div>
               <div className="mt-3">
                  <InputField
                     label="Root Password"
                     setValue={() => {}}
                     errors={errors}
                     name="rootPassword"
                     inputProps={{
                        value: watch("rootPassword"),
                        readOnly: true,
                        size: "middle",
                        // disabled: true,
                        type: "password",
                     }}
                     className="d-flex flex-column flex-fill"
                  />
               </div>
            </>
         )} */}
         <div className="mt-3 d-flex align-items-center justify-content-between ">
            <InputField
               label="Domain"
               setValue={setValue}
               errors={errors}
               name="url"
               inputProps={{
                  value: watch("url"),
                  size: "middle",
                  // addonAfter: ".workcec.com",
                  disabled: true,
               }}
               className="d-flex flex-column flex-fill"
            />
            {/* <div className="group-input d-flex flex-column flex-fill ml-4">
                  <label>Server region</label>
                  <Cascader
                     className="cascader-container"
                     style={{ width: "100%" }}
                     size="large"
                     options={optionsRegion}
                     onChange={(value) => {
                        setValue("region", value)
                     }}
                     disabled={isDisableField}
                     value={watch("region")}
                     defaultValue={"EU"}
                     allowClear={false}
                  />
               </div> */}
         </div>
         <div className="group-input mt-4">
            <InputField
               label="Organization name"
               setValue={setValue}
               errors={errors}
               name="organizationName"
               inputProps={{
                  value: watch("organizationName"),
               }}
            />
         </div>
         <div className="group-input mt-4">
            <CascaderField
               label="Type*"
               setValue={setValue}
               name="type"
               value={watch("type")}
               style={{ width: "100%" }}
               options={optionsType}
               errors={errors}
               cascaderProps={{
                  placeholder: "Select",
               }}
            />
         </div>
         <div className="group-input mt-4">
            <CascaderField
               label="Industry*"
               setValue={setValue}
               name="industry"
               value={watch("industry")}
               style={{ width: "100%" }}
               options={optionsIndustry}
               errors={errors}
               cascaderProps={{
                  placeholder: "Select",
               }}
            />
         </div>
         <div className="group-input mt-4">
            <CascaderField
               label="Size*"
               setValue={setValue}
               name="size"
               style={{ width: "100%" }}
               value={watch("size")}
               options={optionsSize}
               errors={errors}
               cascaderProps={{
                  placeholder: "Select",
               }}
            />
         </div>
         <div className="group-input mt-4">
            <CascaderField
               label="Country*"
               setValue={setValue}
               name="country"
               value={watch("country")}
               style={{ width: "100%" }}
               options={optionsCountry}
               errors={errors}
               cascaderProps={{
                  placeholder: "Select",
               }}
            />
         </div>
         <div className="w-100 d-flex justify-content-center mt-4">
            <Button
               disabled={isDisableField}
               loading={loadingUpdateWorkspace}
               htmlType="submit"
               type="primary"
               size="large"
            >
               Save changes
            </Button>
         </div>
      </form>
   )
}

export default WorkspaceDetails
