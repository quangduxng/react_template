import {
   Button,
   Popconfirm,
   Space,
   Table,
   Typography,
} from "antd"
import React, {
   useCallback,
   useEffect,
   useMemo,
   useState,
} from "react"
import { useSelector, useDispatch } from "react-redux"
import { workspaceActions } from "../../reducers/Workspaces/workspaceSlice"
import "./styles.scss"
import ModalAddWorkspaceSetting from "./ModalAddWorkspaceSetting"
import _ from "lodash"

const WorkspacesSettings = () => {
   const dispatch = useDispatch()

   const workspaceSettings = useSelector(
      (store) => store.workspace.workspaceSettings
   )
   console.log("WorkspacesSettings ~ workspaceSettings", workspaceSettings)
   const loadingDeleteSetting = useSelector(
      (store) => store.workspace.loadingDeleteSetting
   )
   const loadingSaveSettings = useSelector(
      (store) => store.workspace.loadingSaveSettings
   )

   const [isOpenDelete, setIsOpenDelete] = useState(null)

   const [expandedRowKeys, setExpandedRowKeys] = useState([])
   console.log("WorkspacesSettings ~ expandedRowKeys", expandedRowKeys)

   const [isShowModalAddWorkspaceSetting, setIsShowModalAddWorkspaceSetting] =
      useState(false)

   useEffect(() => {
      dispatch(workspaceActions.getWorkspaceSetting())
   }, [dispatch])

   const expandedRowRender = useCallback(
      (record) => {
         const onChangeValue = (e, id) => {
            const indexSetting = workspaceSettings.findIndex(
               (item) => item._id === id
            )
            const { value } = e.target
            if (indexSetting > -1) {
               const temp = JSON.parse(JSON.stringify(workspaceSettings))
               temp[indexSetting].value = value
               dispatch(workspaceActions.changeWorkspaceSetting(temp))
            }
         }

         const columns = [
            {
               title: "",
               render: () => <div />,
               width: 100,
            },
            {
               title: "Key",
               dataIndex: "key",
               key: "key",
               width: 200,
            },
            {
               title: "Value",
               dataIndex: "value",
               render: (_, record) => {
                  return (
                     <textarea
                        className="text-area-value"
                        value={_}
                        onChange={(e) => onChangeValue(e, record._id)}
                     />
                  )
               },
            },
            {
               title: "Action",
               key: "action",
               fixed: "right",
               width: 120,
               render: (_, record) => {
                  return (
                     <Space size="middle">
                        <Popconfirm
                           open={isOpenDelete === record._id}
                           placement="topLeft"
                           onCancel={() => setIsOpenDelete(null)}
                           title="Are you sure want to delete this setting?"
                           onConfirm={() => {
                              dispatch(
                                 workspaceActions.deleteWorkspaceSetting({
                                    id: record._id,
                                 })
                              )
                           }}
                           okButtonProps={{ loading: loadingDeleteSetting }}
                           okText="Yes"
                           cancelText="No"
                        >
                           <Button
                              onClick={() => setIsOpenDelete(record._id)}
                              danger
                              type="primary"
                           >
                              Delete
                           </Button>
                        </Popconfirm>
                     </Space>
                  )
               },
            },
         ]
         return (
            <Table
               columns={columns}
               dataSource={record.list}
               pagination={false}
            />
         )
      },
      [dispatch, isOpenDelete, loadingDeleteSetting, workspaceSettings]
   )

   const columns = [
      Table.EXPAND_COLUMN,
      {
         title: "Group",
         dataIndex: "group",
         key: "group",
      },
      {
         title: "Description",
         dataIndex: "description",
         key: "description",
      },
   ]

   const dataGroup = useMemo(() => {
      const tempGroup = []
      workspaceSettings.forEach((item) => {
         const indexGroup = tempGroup.findIndex(
            (itemTemp) => itemTemp.group === item.group
         )
         if (indexGroup === -1) {
            tempGroup.push({
               group: item.group,
               description: item.description,
               list: [item],
               _id: item._id,
            })
         } else {
            tempGroup[indexGroup].list.push(item)
         }
      })
      return tempGroup
   }, [workspaceSettings])

   return (
      <div className="workspace-settings">
         <div>
            <div className="d-flex align-items-center justify-content-between">
               <Typography.Title level={1} style={{ margin: 0 }}>
                  Workspaces Settings
               </Typography.Title>
               <div className="w-50 d-flex align-items-center pr-5">
                  <Button
                     type="primary"
                     onClick={() => setIsShowModalAddWorkspaceSetting(true)}
                     className="mr-3"
                  >
                     New setting
                  </Button>
                  <Button
                     type="primary"
                     className="mr-3"
                     //  onClick={() => setIsShowModalAddWorkspace(true)}
                  >
                     Sync Settings
                  </Button>
                  <Button
                     type="primary"
                     loading={loadingSaveSettings}
                     onClick={() =>
                        dispatch(
                           workspaceActions.saveWorkspaceSettings({
                              listData: workspaceSettings.map((item) => ({
                                 _id: item._id,
                                 value: item.value,
                              })),
                           })
                        )
                     }
                  >
                     Save Settings
                  </Button>
               </div>
            </div>
         </div>

         <div className="mt-4">
            <Table
               rowkey={(record, index) => index.toString()}
               columns={columns}
               expandable={{
                  expandedRowRender,
               }}
               dataSource={dataGroup}
            />
         </div>
         <ModalAddWorkspaceSetting
            isShow={isShowModalAddWorkspaceSetting}
            handleClose={() => setIsShowModalAddWorkspaceSetting(false)}
         />
      </div>
   )
}

export default WorkspacesSettings
