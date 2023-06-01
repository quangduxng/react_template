import { Modal } from "antd"
import React from "react"
import * as yup from "yup"
import { useForm } from "react-hook-form"
import {yupResolver} from "@hookform/resolvers/yup"
import isSameOrAfter from 'dayjs/plugin/isSameOrAfter'
import utc from 'dayjs/plugin/utc'

import { useDispatch, useSelector } from "react-redux"
import "./styles.scss"
import dayjs from 'dayjs';
import InputField from '../RegisterSaas/Components/InputField';
import {workspaceActions} from '../../reducers/Workspaces/workspaceSlice';

dayjs.extend(isSameOrAfter)
dayjs.extend(utc)
const ModalAddWorkspaceSetting = ({ isShow, handleClose }) => {
   const dispatch = useDispatch()

   const loadingCreateSetting = useSelector(
      (store) => store.workspace.loadingCreateSetting
   )

   const schemaResolver = yupResolver(
      yup.object().shape({
         group: yup.string().required(),
         description: yup.string(),
         key: yup.string().required(),
         value: yup.string()
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
      // watch,
      reset,
      setValue,
   } = methods

   const onSubmit = (values) => {
      console.log('onSubmit ~ values', values);
      dispatch(workspaceActions.createWorkspaceSetting({
         group: values.group,
         description: values.description,
         key: values.key,
         name: values.key,
         value: values.value,
         callback: () => {
            reset()
            handleClose()
         },
      }))
   }

   return (
      <Modal
         title={"Create workspace setting"}
         centered
         open={isShow}
         onCancel={handleClose}
         onOk={handleSubmit(onSubmit)}
         okButtonProps={{ loading: loadingCreateSetting }}
         className="modal-change-plan"
         maskClosable={false}
      >
         <form onSubmit={handleSubmit(onSubmit)}>
            <div className="group-input d-flex flex-column flex-fill">
               <InputField
                  label="Group"
                  setValue={setValue}
                  errors={errors}
                  name="group"
                  className='mt-3'
               />
               <InputField
                  label="Description"
                  setValue={setValue}
                  errors={errors}
                  name="description"
                  className='mt-3'
               />
               <InputField
                  label="Key"
                  setValue={setValue}
                  errors={errors}
                  name="key"
                  className='mt-3'
               />
               <InputField
                  label="Value"
                  setValue={setValue}
                  errors={errors}
                  name="value"
                  inputProps={{
                     type: 'textarea'
                  }}
                  className='mt-3'
               />
            </div>
         </form>
      </Modal>
   )
}

export default ModalAddWorkspaceSetting
