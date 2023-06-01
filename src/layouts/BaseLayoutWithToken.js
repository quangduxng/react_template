/*
 **Author: Santosh Kumar Dash
 **Author URL: http://santoshdash.epizy.com/
 **Github URL: https://github.com/quintuslabs/dashio-admin
 */
 
import React, {useEffect} from "react"
import {useHistory, useLocation} from 'react-router-dom';
import {setUserId, setToken, getToken, getUserId} from '../utils/token';
import "./StyleSheets/BaseLayout.css"
import { verifyLoginByToken } from "../services/auth";
import { useDispatch, useSelector } from "react-redux";
import { authActions } from "../reducers/Auth/authSlice";
 
const BaseLayoutWithToken = ({children}) => {
   const history = useHistory();
   const location = useLocation();
   const dispatch = useDispatch()
   const user = useSelector((store) => store.auth.user)

   useEffect(() => {
      const search = location.search;
      const token = new URLSearchParams(search).get('token');

      if (token) {
         verifyLoginByToken(token).then(result => {
            let data = result.data.data;

            if (data.token && data.userId) {      
               setToken(data.token);
               setUserId(data.userId);
               dispatch(authActions.loginSuccess(data.user));
               setTimeout(() => history.push(location.pathname), 200)
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

   return (
      <div className="container-fluid h-100">{children}</div>
   )
}

export default BaseLayoutWithToken;
 