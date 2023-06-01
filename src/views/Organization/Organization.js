import { Button, Typography } from "antd"
import axios from "axios"
import React, { useEffect } from "react"
import InputField from "../RegisterSaas/Components/InputField"
import "./styles.scss"
const Organization = () => {
   //  useEffect(() => {
   //     axios.post(
   //        "https://payment.dev.appotapay.com/api/v1/orders/payment/bank",
   //        {
   //           amount: 50000,
   //           orderId: "cxvfgffgg",
   //           orderInfo: "test",
   //           bankCode: "SHB",
   //           paymentMethod: "ATM",
   //           clientIp: "142.4.215.171",
   //           redirectUrl: "http://localhost:3000",
   //           signature:
   //              "3b5a36891f8443f38570ab97c8767e57342be11b4f301c81ca10206f7cf907e7",
   //       }, {
   //          headers: {
   //            'X-APPOTAPAY-AUTH': 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiIsImN0eSI6ImFwcG90YXBheS1hcGk7dj0xIn0.eyJpc3MiOiJBUFBPVEFQQVkiLCJqdGkiOiJGSmNtRjh1ajJJU3ZlTDVGdnZOazRwbnA4eHJoSU56OC0xNjcyOTc0ODgyIiwiYXBpX2tleSI6IkZKY21GOHVqMklTdmVMNUZ2dk5rNHBucDh4cmhJTno4IiwiZXhwIjoxNjcyOTg0NzM5fQ.4GXwiY4AjTKohXVnHCrnVilHtHUs_OsmZVrwvRgNqlo'
   //          }
   //        }
   //     ).then(res => {
   //       console.log('ress', res)
   //     }).catch(e => {
   //       console.log('error', e)
   //     })
   //  }, [])

   return (
      <div className="profile-page col-12 ml-4 col-sm-10 col-md-10 col-lg-8 col-xl-6">
         <div className="d-flex align-items-center justify-content-between">
            <Typography.Title level={1} style={{ margin: 0 }}>
               Organization
            </Typography.Title>
            <Button type="primary" size="large">
               Save changes
            </Button>
         </div>
         <div className="mt-4">
            <InputField label="Organization Name" />
            <div className="d-flex align-items-center justify-content-between flex-fill mt-3">
               <InputField
                  label="Address Line 1"
                  className="d-flex flex-column flex-fill"
               />
               <InputField
                  label="Address Line 2"
                  className="d-flex flex-column flex-fill ml-4"
               />
            </div>
            <div className="d-flex align-items-center justify-content-between flex-fill mt-3">
               <InputField label="City" className="d-flex flex-column flex-fill" />
               <InputField label="State/Province" className="d-flex flex-column flex-fill ml-4" />
            </div>
            <div className="d-flex align-items-center justify-content-between flex-fill mt-3">
               <InputField label="Country" className="d-flex flex-column flex-fill" />
               <InputField label="Zip Code" className="d-flex flex-column flex-fill ml-4" />
            </div>
         </div>
         <InputField className="mt-3" label="VAT ID" />
         <InputField className="mt-3" label="Password" />
      </div>
   )
}

export default Organization
