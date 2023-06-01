import {
   Button,
   Checkbox,
   Input,
   Popconfirm,
   Space,
   Table,
   Typography,
} from "antd"
import React, { useEffect, useState } from "react"
import { useSelector, useDispatch } from "react-redux"
import { useHistory } from "react-router-dom"
import {rolesUser} from '../../constants/DataWorkspace';
import { SCREEN_NAME } from "../../constants/screens"
import { userActions } from "../../reducers/Users/userSlice"
import ModalAddUser from "./components/ModalAddUser"
import "./styles.scss"
const Users = () => {
   const dispatch = useDispatch()
   const history = useHistory()

   const listUser = useSelector((store) => store.user.listUser)
   const loading = useSelector((store) => store.user.loading)
   const loadingDeleteUser = useSelector(
      (store) => store.user.loadingDeleteUser
   )
   // console.log("Workspaces ~ User", listUser)

   const [listUserState, setListUserState] = useState([])
   const [listUserSearch, setListUserSearch] = useState([])
   const [valueSearch, setValueSearch] = useState("")
   const [isShowModalAddUser, setIsShowModalAddUser] = useState(false)
   const [onOpenDelete, setOnOpenDelete] = useState(null)

   useEffect(() => {
      dispatch(userActions.getListUser())
   }, [dispatch])

   useEffect(() => {
      if (listUser.length > 0) {
         setListUserState(listUser)
      }
   }, [listUser])

   const columns = [
      {
         title: "Email",
         dataIndex: "email",
         key: "email",
         // render: (text, record) => (
         //    <div
         //       className="name-column text-primary"
         //       onClick={() =>
         //          history.push(`${SCREEN_NAME.USER_DETAIL}/${record._id}`)
         //       }
         //    >
         //       {text}
         //    </div>
         // ),
      },
      {
         title: "Full Name",
         dataIndex: "fullname",
         key: "fullname",
      },
      {
         title: "Role",
         dataIndex: "role",
         key: "role",
         render: (value) => (
            <Checkbox checked={value === rolesUser.superadmin} onChange={() => {}}>
               ADMIN
            </Checkbox>
         ),
      },
      {
         title: "Action",
         key: "action",
         render: (_, record) => (
            <Space size="middle">
               <Button
                     type='primary'
                     // style={{background: "#17a2b8", color: '#FFF'}}
                     className='button-edit-info'
                     onClick={() =>
                        history.push(`${SCREEN_NAME.USER_DETAIL}/${record._id}`)
                     }
                  >
                     Edit
                  </Button>
               <Popconfirm
                  placement="topLeft"
                  open={onOpenDelete === record._id}
                  title="Are you sure want to delete this user?"
                  description="This cannot be undone"
                  onConfirm={onDeleteUser(record?._id)}
                  okButtonProps={{ loading: loadingDeleteUser }}
                  okText="Yes"
                  cancelText="No"
                  onCancel={() => setOnOpenDelete(null)}
               >
                  <Button onClick={() => setOnOpenDelete(record._id)} type="primary" danger>
                     Delete
                  </Button>
               </Popconfirm>
            </Space>
         ),
      },
   ]

   const onDeleteUser = (id) => () => {
      dispatch(
         userActions.deleteUser({
            id,
            callback: () => {
               setOnOpenDelete(null)
            }
         })
      )
   }

   const onSearch = (value) => {
      setValueSearch(value)
      let temp = JSON.parse(JSON.stringify(listUserState))
      temp = temp.filter(
         (item) =>
            item.email?.toLowerCase()?.includes(value.toLowerCase()) || item?.fullname?.toLowerCase()?.includes(value.toLowerCase())
      )
      setListUserSearch(temp)
   }

   return (
      <div className="workspace-page">
         <div>
            <div className="d-flex align-items-center justify-content-between">
               <Typography.Title level={1} style={{ margin: 0 }}>
                  Users
               </Typography.Title>

               <div className="w-50 pr-5 d-flex align-items-center">
                  {/* <Button
                     type="primary"
                     onClick={() => setIsShowModalAddUser(true)}
                  >
                     New user
                  </Button> */}
                  <Input.Search
                     placeholder="Input user's Full Name, Email"
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
                  valueSearch.length > 0 ? listUserSearch : listUserState
               }
            />
         </div>
         {isShowModalAddUser && (
            <ModalAddUser
               isShow={isShowModalAddUser}
               handleClose={() => setIsShowModalAddUser(false)}
            />
         )}
      </div>
   )
}

export default Users
