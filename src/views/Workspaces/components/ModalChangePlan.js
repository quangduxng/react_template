import { DatePicker, Modal, Switch, Typography } from "antd"
import React, { useEffect } from "react"
import * as yup from "yup"
import { useForm } from "react-hook-form"
import {yupResolver} from "@hookform/resolvers/yup"
import isSameOrAfter from 'dayjs/plugin/isSameOrAfter'
import utc from 'dayjs/plugin/utc'

import { useDispatch, useSelector } from "react-redux"
import "../styles.scss"
import { dateFormat, planTypesWorkspace } from "../../../constants/DataWorkspace"
import dayjs from 'dayjs';
import {workspaceActions} from '../../../reducers/Workspaces/workspaceSlice';

dayjs.extend(isSameOrAfter)
dayjs.extend(utc)
const ModalChangePlan = ({ isShow, handleClose, currentWorkspace }) => {
   const dispatch = useDispatch()

   const loadingChangePlanWorkspace = useSelector(
      (store) => store.workspace.loadingChangePlanWorkspace
   )

   const schemaResolver = yupResolver(
      yup.object().shape({
         plan: yup.string().required(),
         expiredDate: yup.string().required(),
      })
   )

   const methods = useForm({
      resolver: schemaResolver,
      mode: "all",
   })
   const {
      handleSubmit,
      // register,
      // formState: { errors },
      // setError,
      watch,
      // reset,
      setValue,
   } = methods

   useEffect(() => {
      setValue("plan", currentWorkspace.planType)
      setValue("expiredDate", dayjs(currentWorkspace.expired_date).format(dateFormat))
   }, [currentWorkspace, setValue])


   const onChange = (date, dateString) => {
      setValue('expiredDate', dayjs(date).format(dateFormat))
   }

   const onSubmit = (values) => {
      dispatch(workspaceActions.changePlanWorkspace({
         id: currentWorkspace?._id,
         params: {
            planType: values.plan,
            expireDate: dayjs(values.expiredDate, dateFormat).utc(true).toDate(),
         },
         callback: () => {
            handleClose()
         }
      }))
   }

   return (
      <Modal
         title={"Change plan workspace"}
         centered
         open={isShow}
         onCancel={handleClose}
         onOk={handleSubmit(onSubmit)}
         okButtonProps={{ loading: loadingChangePlanWorkspace }}
         className="modal-change-plan"
         maskClosable={false}
      >
         <form onSubmit={handleSubmit(onSubmit)}>
            <div className="group-input d-flex flex-column flex-fill">
               <div className="switch-container d-flex flex-column mt-3">
                  <Typography.Text strong>Plan Type</Typography.Text>
                  <Switch
                     onChange={(check) =>
                        setValue(
                           "plan",
                           check
                              ? planTypesWorkspace.subscription
                              : planTypesWorkspace.trial
                        )
                     }
                     className="mt-2"
                     checked={watch("plan") === planTypesWorkspace.subscription}
                     checkedChildren={planTypesWorkspace.subscription}
                     unCheckedChildren={planTypesWorkspace.trial}
                  />
               </div>
               <div className="mt-3 d-flex flex-column">
                  <Typography.Text strong>Expired Date</Typography.Text>
                  <DatePicker
                     clearIcon={false}
                     inputReadOnly
                     // disabledDate={(currentDate) => !currentDate.isSameOrAfter(dayjs().subtract(1, 'days'))}
                     value={dayjs(watch('expiredDate', dateFormat))} className="mt-2" onChange={onChange}
                  />
               </div>
            </div>
         </form>
      </Modal>
   )
}

export default ModalChangePlan
