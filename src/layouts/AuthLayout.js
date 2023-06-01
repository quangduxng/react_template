/*
 **Author: Santosh Kumar Dash
 **Author URL: http://santoshdash.epizy.com/
 **Github URL: https://github.com/quintuslabs/dashio-admin
 */

import React, {useEffect} from "react"
import {useSelector} from 'react-redux';
import {useHistory} from 'react-router-dom';
import {SCREEN_NAME} from '../constants/screens';
import {getToken} from '../utils/token';
import "./StyleSheets/BaseLayout.css"

const AuthLayout = ({children}) => {
   const user = useSelector((store) => store.auth.user)
   const history = useHistory()
   
   useEffect(() => {
      const token = getToken()
      if (user || token) {
         history.replace(SCREEN_NAME.WORKSPACES)
      }
   }, [user, history])
   return (
      <div className="container-fluid h-100">{children}</div>
   )
}

export default AuthLayout
