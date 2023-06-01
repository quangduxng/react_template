import { Result } from "antd"
import React from "react"
import { useHistory } from "react-router-dom"
import { SCREEN_NAME } from "../../constants/screens"

const SuccessRegisterSaas = () => {
   const history = useHistory()

   if (!history.location.state?.email) {
      history.replace(SCREEN_NAME.REGISTER_SAAS)
   }
   return (
      <div className="d-flex w-100 h-100 align-items-center justify-content-center">
         <Result
            status="success"
            title="Register Saas successfully"
            subTitle={`Please check your email ${history.location?.state?.email} for more information`}
         />
      </div>
   )
}

export default SuccessRegisterSaas
