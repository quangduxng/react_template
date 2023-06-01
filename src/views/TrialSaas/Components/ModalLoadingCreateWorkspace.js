import { Button, Modal, Result, Spin } from "antd"
import React, { useEffect, useRef, useState } from "react"
import {useDispatch, useSelector} from "react-redux"
import { useHistory } from "react-router-dom"
import { statusWorkspace } from "../../../constants/DataWorkspace"
import {workspaceActions} from "../../../reducers/Workspaces/workspaceSlice"
import { SCREEN_NAME } from "../../../constants/screens"
import "../styles.scss"

const ModalLoadingCreateWorkspace = ({ isShow, handleClose, linkRedirect }) => {
   const [timeoutRedirect, setTimeoutRedirect] = useState(5)
   const interval = useRef(null)
   const dispatch = useDispatch()
   const history = useHistory()

   const currentInitializingWorkspace = useSelector(
      (store) => store.workspace.currentInitializingWorkspace
   )

   useEffect(() => {
      if (isShow) {
         dispatch(workspaceActions.getStatusCreateWorkspace())
         interval.current = setInterval(() => {
            dispatch(workspaceActions.getStatusCreateWorkspace())
         }, 5000)
         return () => {
            clearInterval(interval.current)
         }
      }
   }, [dispatch, isShow])

   useEffect(() => {
      if (
         isShow &&
         currentInitializingWorkspace?.status === statusWorkspace.active
      ) {
         clearInterval(interval.current)
         interval.current = setInterval(() => {
            setTimeoutRedirect((prev) => {
               if (prev > 0) {
                  return prev - 1
               } else {
                  window.location.replace(linkRedirect)
                  return 0
               }
            })
         }, 1000)
      }
   }, [currentInitializingWorkspace, linkRedirect, isShow])

   return (
      <Modal
         className="modal-create-workspace"
         title={null}
         centered
         open={isShow}
         closable={false}
         footer={null}
      >
         <div
            style={{ minHeight: 300 }}
            className="d-flex align-items-center justify-content-center flex-column w-100 h-100"
         >
            {(!currentInitializingWorkspace?.status ||
               currentInitializingWorkspace?.status ===
                  statusWorkspace.initializing) && (
               <div>
                  <Spin tip="Workspace is initializing! This may take a few minutes..." size="large"></Spin>
               </div>
            )}

            {currentInitializingWorkspace?.status === statusWorkspace.active ? (
               <Result
                  status="success"
                  title="Create workspace successfully!"
                  subTitle={
                     <div>
                        You will be redirected to
                        <strong> {linkRedirect}</strong> automatically after
                        <span style={{ color: "red" }}>
                           {" "}
                           {timeoutRedirect}s
                        </span>
                        . Or you can <a href={linkRedirect}>click here</a> to
                        redirect manually
                     </div>
                  }
               />
            ) : currentInitializingWorkspace?.status ===
              statusWorkspace.error ? (
               <Result
                  status="error"
                  title="Workspace initializing has been failure"
                  subTitle="An error has occured, Please try again later"
                  extra={[
                     <Button key="try-again" onClick={() => {
                        handleClose()
                        history.push(SCREEN_NAME.WORKSPACES)
                     }}>
                        Close
                     </Button>,
                  ]}
               ></Result>
            ) : null}
         </div>
      </Modal>
   )
}

export default ModalLoadingCreateWorkspace
