/* eslint-disable jsx-a11y/anchor-is-valid */
/*
 **Author: Santosh Kumar Dash
 **Author URL: http://santoshdash.epizy.com/
 **Github URL: https://github.com/quintuslabs/dashio-admin
 */

import React from "react"
import "./StyleSheets/Navbar.scss"
import { Link, useHistory } from "react-router-dom"
import { DownOutlined } from "@ant-design/icons"
import { AppImages } from "../../assets/images"
import { Dropdown, Space } from "antd"
import { useSelector, useDispatch } from "react-redux"
import { authActions } from "../../reducers/Auth/authSlice"
import { SCREEN_NAME } from "../../constants/screens"

const Navbar = ({ onToggleClick }) => {
   const dispatch = useDispatch()
   const user = useSelector((store) => store.auth.user)
   const history = useHistory()

   const items = [
      {
         key: "0",
         label: (
            <div onClick={() => history.push(SCREEN_NAME.PROFILE)}>
              <i className="fa-solid fa-user pr-2"></i>  My Profile
            </div>
         ),
      },
      {
         key: "1",
         label: (
            <div onClick={() => history.push(SCREEN_NAME.CHANGE_PASSWORD)}> <i className="fa-sharp fa-solid fa-key pr-2"></i>Change Password</div>
         ),
      },
      {
         key: "2",
         label: (
            <div onClick={() => dispatch(authActions.logout())}><i className="fa-solid fa-right-from-bracket pr-2"></i>Logout</div>
         ),
      }
   ]
   const  redirectHomepage =()=>{
      window.location.replace(process.env.REACT_APP_WORKCEC_URL);
   }
   return (
      <div className="header-section " id="sticky">
         <nav className="navbar navbar-expand-lg  navbar-light header" >
            <div className="container-fluid">
               <div className="d-flex align-items-center justify-content-between flex-fill">
                  <div className="d-flex align-items-center">
                     <div onClick={() => onToggleClick()}>
                        <i className="fa fa-bars" aria-hidden="true" style={{ cursor: "pointer",
                                                                              color:"white"
                                                                              }}></i>
                     </div>
                     {/* <Link> */}
                        <div className="nav-title">
                           <img
                              onClick={redirectHomepage}
                              src={AppImages.logoWorkcecHorizontal}
                              width={136}
                              height={48}
                              alt="workCEC"
                              style={{ marginRight: 16,
                                       cursor: "pointer"
                                       }}
                           />
                        </div>
                     {/* </Link> */}
                  </div>

                  <div className="nav navbar-nav ml-auto">
                     <label style={{color:"white"}}>                       
                           Welcome {user?.email}

                     </label>
                  </div>
               </div>

               {/* <button
           className="btn btn-dark d-inline-block d-lg-none ml-auto"
           type="button"
           data-toggle="collapse"
           data-target="#navbarSupportedContent"
           aria-controls="navbarSupportedContent"
           aria-expanded="false"
           aria-label="Toggle navigation"
         >
           <i className="fa fa-align-justify"></i>
         </button> */}
            </div>
         </nav>
      </div>
   )
}

export default Navbar
