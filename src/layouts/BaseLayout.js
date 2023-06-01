/*
 **Author: Santosh Kumar Dash
 **Author URL: http://santoshdash.epizy.com/
 **Github URL: https://github.com/quintuslabs/dashio-admin
 */

import React, { useEffect, useState } from "react"
import { useSelector, useDispatch } from "react-redux"
import "./StyleSheets/BaseLayout.css"
import Sidebar from "../components/Sidebar/Sidebar"
import Navbar from "../components/Navbar/Navbar"
// import Footer from "../components/Footer/Footer"
import { useHistory, useLocation } from "react-router-dom"
import { getToken, getUserId, setToken, setUserId } from "../utils/token"
import { authActions } from "../reducers/Auth/authSlice"
import { verifyLoginByToken } from "../services/auth"
import { SCREEN_NAME } from '../constants/screens';

const BaseLayout = ({ children }) => {
   const [state, setState] = useState({
      toggleClass: "",
   })

   const history = useHistory()
   const location = useLocation()
   const dispatch = useDispatch()

   const user = useSelector((store) => store.auth.user)

   useEffect(() => {
      const search = location.search;
      const token = new URLSearchParams(search).get('token');

      if (token) {
         verifyLoginByToken(token).then(result=> {
            let data = result.data.data;

            if (data.token && data.userId) {      
               setToken(data.token);
               setUserId(data.userId);
               dispatch(authActions.loginSuccess(data.user));
               setTimeout(() => history.replace(location.pathname), 200)
            } else {
               window.location.replace(process.env.REACT_APP_WORKCEC_URL +"/login");
            }
         }).catch(()=> {
            window.location.replace(process.env.REACT_APP_WORKCEC_URL +"/login");
         })
      } else {
         const stoken = getToken();
         const userId = getUserId();
         if (!stoken || !userId) {
            window.location.replace(process.env.REACT_APP_WORKCEC_URL +"/login");
         }

         if (!user) {
            dispatch(authActions.getUser())
         }
      }
   }, [history, location, dispatch, user])

   const onToggle = () => {
      if (state.toggleClass === "active") {
         setState({ toggleClass: "" })
      } else {
         setState({ toggleClass: "active" })
      }
   }

   if (!user) {
      return null
   }

   return (
      <div>
         <Navbar onToggleClick={() => onToggle()} />
         <div className="wrapper">
            <div className="sidebar-container">
               <Sidebar toggleClass={state.toggleClass} />
            </div>

            <div id="content" className={state.toggleClass}>
               <div className="layout-Container">{children}</div>

               {/* <div className="container-fluid footer-container">
                  <Footer />
               </div> */}
            </div>
         </div>
      </div>
   )
}

export default BaseLayout
