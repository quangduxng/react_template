import {
   Button,
   Dropdown,
   Input,
   Popconfirm,
   Space,
   Table,
   Tag,
   Typography,
} from "antd"
import React, { useEffect, useState } from "react"
import { useSelector, useDispatch } from "react-redux"
import { useHistory } from "react-router-dom"
import { SCREEN_NAME } from "../../constants/screens"
import { workspaceActions } from "../../reducers/Workspaces/workspaceSlice"
import "./styles.scss"
import classNames from "classnames"
import { getUserId } from "../../utils/token"
import ModalAddWorkspace from "./components/ModalAddWorkspace"
import moment from "moment"
import {
   dateFormat,
   planTypesWorkspace,
   rolesUser,
   statusWorkspace,
} from "../../constants/DataWorkspace"
import ModalChangePlan from "./components/ModalChangePlan"
import { WORKCEC_URL } from "../../config"
import { DownOutlined } from "@ant-design/icons"
const Workspaces = () => {
   const dispatch = useDispatch()
   const history = useHistory()
   const listWorkspace = useSelector((store) => store.workspace.listWorkspace)
   const loading = useSelector((store) => store.workspace.loading)
   const loadingDeleteWorkspace = useSelector(
      (store) => store.workspace.loadingDeleteWorkspace
   )
   const loadingRestartWorkspace = useSelector(
      (store) => store.workspace.loadingRestartWorkspace
   )
   const loadingToggleActiveWorkspace = useSelector(
      (store) => store.workspace.loadingToggleActiveWorkspace
   )
   const user = useSelector((store) => store.auth.user)

   const [listWorkspaceState, setListWorkspaceState] = useState([])
   const [listWorkspaceSearch, setListWorkspaceSearch] = useState([])
   const [valueSearch, setValueSearch] = useState("")
   const [isShowModalAddWorkspace, setIsShowModalAddWorkspace] = useState(false)
   const [isShowModalChangePlan, setIsShowModalChangePlan] = useState(false)
   const [currentProcessWorkspace, setCurrentProcessWorkspace] = useState(false)
   const id_product  = process.env.REACT_APP_ID_PRODUCT_PREMIUM;
   const [openButton, setOpenButton] = useState({
      subscription: null,
      activate: null,
      restart: null,
      delete: null,
   })

   const onTogglePopover = (name, id) => {
      setOpenButton((prev) => ({
         ...prev,
         [name]: id,
      }))
   }

   const getWorkspace = () => {
      if (user.role === rolesUser.customer) {
         dispatch(
            workspaceActions.getListWorkspace({
               byAdmin: getUserId(),
            })
         )
      } else {
         dispatch(workspaceActions.getListWorkspace())
      }
   }

   useEffect(() => {
      getWorkspace()
      // eslint-disable-next-line react-hooks/exhaustive-deps
   }, [dispatch, user])

   useEffect(() => {
      setListWorkspaceState(listWorkspace);
   }, [listWorkspace])

   const columns = [
      {
         title: "Name",
         dataIndex: "name",
         key: "name",
         // render: (text, record) => (
         //    <div
         //       className="name-column text-primary"
         //       onClick={() => {
         //          history.push(
         //             `${SCREEN_NAME.WORKSPACE_DETAILS}/${record?._id}`
         //          )
         //       }}
         //    >
         //       {text}
         //    </div>
         // ),
      },
      {
         title: "Org. Email",
         dataIndex: "organization_email",
         key: "organization_email",
      },
      {
         title: "Domain",
         dataIndex: "url",
         key: "url",
         render: (url) => {
            return (
               <div
                  className="link-url"
                  onClick={(e) => {
                     e.stopPropagation()
                     window.open(url)
                  }}
               >
                  {url}
               </div>
            )
         },
      },
      // {
      //    title: "Region",
      //    dataIndex: "server_region",
      //    key: "server_region",
      //    width: 100,
      // },
      {
         title: "Plan",
         key: "currentPlan",
         dataIndex: "currentPlan",
         width: 130,
         render: (_, record) => {
            const textSubcription = record?.planType;
            const color =
               textSubcription === planTypesWorkspace.trial
                  ? "gold"
                  : "geekblue"
            return <div className="d-flex flex-row justify-content-center algin-items-center text-algin-center">
               <Tag className="d-flex  justify-content-center align-items-center" color={color} style={{minWidth:"100px"}}>{textSubcription}</Tag>
               <Button
                        onClick={() => {
                           if (
                              !record.sub_id
                           ) {
                              const urlCheckout = `${WORKCEC_URL}/checkout?add-to-cart=${id_product}&ws_url=${
                                 record.url
                              }&ws_id=${record?._id}`
                              window.open(urlCheckout, "_self")
                           } else {
                              let urlCheckout;
                              user?.role === rolesUser.customer 
                              ? urlCheckout = `${WORKCEC_URL}/my-account/view-subscription/${record.sub_id}`
                              : urlCheckout =`${WORKCEC_URL}/wp-admin/post.php?post=${record.sub_id}&action=edit`
                              window.open(urlCheckout, "_self")
                           }
                        }}
                        type="primary"
                        // style={{background: "#17a2b8", color: '#FFF'}}
                        className={!record.sub_id ? "button-subcription-workspace" : "button-edit-info"}
                           style={{
                              minWidth: "fit-content"
                           }}
                     >
                        {!record.sub_id 
                           ? "Subscription now"
                           : "Subscription detail"}
                     </Button>
            </div>

            
         },
      },
      
      {
         title: "Register Date",
         dataIndex: "created_at",
         key: "created_at",
         render: (date) => <div>{date.substring(0, 10)}</div>,
         width: 150,
         sorter: (a, b) =>
            moment(a.created_at).unix() - moment(b.created_at).unix(),
      },
      {
         title: "Expired Date",
         dataIndex: "expired_date",
         key: "expired_date",
         render: (date) => <div>{date ? date.substring(0, 10): "-"}</div>,
         width: 150,
         sorter: (a, b) =>
            moment(a.expired_date).unix() - moment(b.expired_date).unix(),
      },
      {
         title: "Status",
         key: "status",
         dataIndex: "status",
         width: 150,
         render: (_, record) => (
            <div className="d-flex align-items-center">
               <div
                  className={classNames("bullet-inactive", {
                     "bullet-active": record?.status === statusWorkspace.active,
                     "bullet-cancel":
                        record?.status === statusWorkspace.deleted ||
                        record?.status === statusWorkspace.deactive ||
                        record?.status === statusWorkspace.error,
                     "bullet-yellow":
                        record.status === statusWorkspace.initializing,
                     "bullet-orange": record.status === statusWorkspace.expired,
                  })}
               />{" "}
               {record?.status}
            </div>
         ),
      },
      {
         title: "Action",
         key: "action",
         render: (_, record) => {
            const items = []

            items.push({
               key: "0",
               label: (
                  <Button
                     type="primary"
                     // style={{background: "#17a2b8", color: '#FFF'}}
                     className="button-edit-info"
                     onClick={() =>
                        history.push(
                           `${SCREEN_NAME.WORKSPACE_DETAILS}/${record?._id}`
                        )
                     }
                  >
                     Edit
                  </Button>
               ),
            })

            /** button subscription customer */
            if (
               user.role === rolesUser.customer &&
               (record.status === statusWorkspace.active ||
                  record.status === statusWorkspace.expired)
            ) {
               items.push({
                  key: "1",
                  // label: (
                  //    <Button
                  //       onClick={() => {
                  //          if (
                  //             record.planType !==
                  //             planTypesWorkspace.subscription
                  //          ) {
                  //             const urlCheckout = `${WORKCEC_URL}/checkout?add-to-cart=${id_product}&quantity=${quantity}&wsURL=${
                  //                record.url
                  //             }&id_ws=${record?._id}`
                  //             window.open(urlCheckout, "_self")
                  //          }
                  //       }}
                  //       type="primary"
                  //       // style={{background: "#17a2b8", color: '#FFF'}}
                  //       className="button-subcription-workspace"
                  //    >
                  //       {record.planType !== planTypesWorkspace.subscription
                  //          ? "Subscription"
                  //          : "Unsubscription"}
                  //    </Button>
                  // ),
               })
            }

            /** button change plan super admin */
            if (
               user.role === rolesUser.superadmin &&
               (record.status === statusWorkspace.active ||
                  record.status === statusWorkspace.expired)
            ) {
               items.push({
                  key: "2",
                  label: (
                     <Button
                        onClick={() => {
                           setCurrentProcessWorkspace(record)
                           setIsShowModalChangePlan(true)
                        }}
                        type="primary"
                        // style={{background: "#17a2b8", color: '#FFF'}}
                        className="button-subcription-workspace"
                     >
                        Change Plan
                     </Button>
                  ),
               })
            }

            /** button activate/deactivate super admin */
            if (
               user.role === rolesUser.superadmin &&
               (record.status === statusWorkspace.active ||
                  record.status === statusWorkspace.deactive)
            ) {
               items.push({
                  key: "3",
                  label: (
                     <Popconfirm
                        placement="topLeft"
                        showArrow={false}
                        title={`Are you sure want to ${
                           record.status === statusWorkspace.deactive
                              ? "activate"
                              : "deactivate"
                        } this workspace?`}
                        open={openButton["activate"] === record._id}
                        onCancel={() => onTogglePopover("activate", null)}
                        className="popover-active-workspace"
                        onConfirm={() => {
                           dispatch(
                              workspaceActions.toggleActiveWorkspace({
                                 id: record?._id,
                                 params: {
                                    isActive:
                                       record.status ===
                                       statusWorkspace.deactive
                                          ? true
                                          : false,
                                 },
                                 message:
                                    record.status === statusWorkspace.deactive
                                       ? "Activate workspace successfully"
                                       : "Deactivate workspace successfully",
                                 callback: () => {
                                    getWorkspace()
                                    onTogglePopover("activate", null)
                                 },
                              })
                           )
                        }}
                        okButtonProps={{
                           loading: loadingToggleActiveWorkspace,
                        }}
                        okText="Yes"
                        cancelText="No"
                     >
                        <Button
                           onClick={() =>
                              onTogglePopover("activate", record._id)
                           }
                           type="primary"
                           block
                           className={classNames("button-active-workspace", {
                              "button-active-workspace__disabled":
                                 record.status === statusWorkspace.deleted ||
                                 record.status ===
                                    statusWorkspace.initializing ||
                                 record.status === statusWorkspace.error ||
                                 record.status === statusWorkspace.expired,
                           })}
                        >
                           {record.status === statusWorkspace.active
                              ? "Deactivate"
                              : "Activate"}
                        </Button>
                     </Popconfirm>
                  ),
               })
            }

            /** button restart */
            if (
               record.status === statusWorkspace.active ||
               record.status === statusWorkspace.expired
            ) {
               items.push({
                  key: "4",
                  label: (
                     <Popconfirm
                        showArrow={false}
                        open={openButton["restart"] === record._id}
                        placement="topLeft"
                        onCancel={() => onTogglePopover("restart", null)}
                        title="Are you sure want to restart this workspace?"
                        onConfirm={() => {
                           dispatch(
                              workspaceActions.restartWorkspace({
                                 id: record._id,
                                 callback: () => {
                                    onTogglePopover("restart", null)
                                 },
                              })
                           )
                        }}
                        okButtonProps={{ loading: loadingRestartWorkspace }}
                        okText="Yes"
                        cancelText="No"
                     >
                        <Button
                           onClick={() =>
                              onTogglePopover("restart", record._id)
                           }
                           style={{ width: 117 }}
                           type="primary"
                        >
                           Restart
                        </Button>
                     </Popconfirm>
                  ),
               })
            }

            /** button delete */

            items.push({
               key: "5",
               label: (
                  <Popconfirm
                     placement="topLeft"
                     showArrow={false}
                     onCancel={() => onTogglePopover("delete", null)}
                     title="Are you sure want to delete this workspace?"
                     description="This cannot be undone"
                     onConfirm={() => {
                        dispatch(
                           workspaceActions.deleteWorkspace({
                              id: record._id,
                              callback: () => {
                                 onTogglePopover("delete", null)
                              },
                           })
                        )
                     }}
                     open={openButton["delete"] === record._id}
                     okButtonProps={{ loading: loadingDeleteWorkspace }}
                     okText="Yes"
                     cancelText="No"
                  >

                     {

                        (user.role === rolesUser.superadmin && !record.sub_id) //role is admin and ws don't payment
                         ||
                        (user.role === rolesUser.customer &&  record?.status === statusWorkspace.error) // role customer and status ws error
                        ?
                           <Button
                           onClick={() => onTogglePopover("delete", record._id)}
                           type="primary"
                           danger
                           style={{ width: 117 }}
                        >
                           Delete
                        </Button>
                        : null
                     }
                     
                  </Popconfirm>
               ),
            })

            return (
               <Dropdown menu={{ items }}>
                  <Button type="primary" onClick={(e) => e.preventDefault()}>
                     <Space>
                        Action
                        <DownOutlined />
                     </Space>
                  </Button>
               </Dropdown>
            )
         },
      },
   ]

   const onSearch = (value) => {
      setValueSearch(value)
      let temp = JSON.parse(JSON.stringify(listWorkspaceState))
      temp = temp.filter(
         (item) =>
            item.name?.toLowerCase().includes(value.toLowerCase()) ||
            item?.url?.toLowerCase().includes(value.toLowerCase()) ||
            item.organization_email?.toLowerCase().includes(value.toLowerCase())
      )
      setListWorkspaceSearch(temp)
   }

   return (
      <div className="workspace-page">
         <div>
            <div className="d-flex align-items-center justify-content-between">
               <Typography.Title level={1} style={{ margin: 0 }}>
                  Workspaces
               </Typography.Title>
               <div className="w-50 d-flex align-items-center pr-5">
                  {/* <Button
                     type="primary"
                     onClick={() => history.push(SCREEN_NAME.TRIAL_SAAS)}
                  >
                     New workspace
                  </Button> */}
                  <Input.Search
                     placeholder="Input workspace's name, url or organization's email"
                     allowClear
                     enterButton="Search"
                     size="large"
                     style={{ display: "flex", flex: 1, marginLeft: 32 }}
                     onSearch={onSearch}
                  />
               </div>
            </div>
         </div>

         <div className="mt-4">
            <Table
               loading={loading}
               columns={columns}
               dataSource={
                  valueSearch.length > 0
                     ? listWorkspaceSearch
                     : listWorkspaceState
               }
               // scroll={{ x: 1600 }}
            />
         </div>
         {isShowModalAddWorkspace && (
            <ModalAddWorkspace
               isShow={isShowModalAddWorkspace}
               handleClose={() => setIsShowModalAddWorkspace(false)}
            />
         )}
         <ModalChangePlan
            isShow={isShowModalChangePlan}
            handleClose={() => setIsShowModalChangePlan(false)}
            currentWorkspace={currentProcessWorkspace}
         />
      </div>
   )
}

export default Workspaces
