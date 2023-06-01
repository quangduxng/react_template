import { Input, Table, Tag, Typography } from "antd"
import React, { useState } from "react"
import { useDispatch } from "react-redux"
import { useHistory } from "react-router-dom"
import "./styles.scss"
import classNames from "classnames"
import moment from "moment"
import {
   planTypesWorkspace,
   statusWorkspace,
} from "../../constants/DataWorkspace"

const dataInvoice = [
   // {
   //    id: "000123",
   //    date: "03-20-2023",
   //    url: "https://url1.workcec.com",
   //    status: "Paid",
   //    orgEmail: "duy.ta@heatmob.net",
   //    total: '$232'
   // },
   // {
   //    id: "000242",
   //    date: "03-25-2023",
   //    url: "https://url2.workcec.com",
   //    status: "Pending",
   //    orgEmail: "duy.ta2@heatmob.net",
   //    total: '$100'
   // },
   // {
   //    id: "00012323",
   //    date: "03-22-2023",
   //    url: "https://url3.workcec.com",
   //    status: "Failed",
   //    orgEmail: "duy.ta3@heatmob.net",
   //    total: '$168'
   // },
]

const Invoices = () => {
   const dispatch = useDispatch()
   const history = useHistory()

   const [listInvoice, setListInvoice] = useState(dataInvoice)
   const [listInvoiceSearch, setListInvoiceSearch] = useState([])
   const [valueSearch, setValueSearch] = useState("")

   const onSearch = (value) => {
      setValueSearch(value)
      let temp = JSON.parse(JSON.stringify(listInvoice))
      temp = temp.filter(
         (item) =>
            item.id?.toLowerCase().includes(value.toLowerCase()) ||
            item?.url?.toLowerCase().includes(value.toLowerCase()) ||
            item.organization_email?.toLowerCase().includes(value.toLowerCase())
      )
      setListInvoiceSearch(temp)
   }

   const columns = [
      {
         title: "Invoice Number",
         dataIndex: "id",
         key: "id",
         // render: (text, record) => (
         //    <div
         //       className="name-column text-primary"
         //       onClick={() =>
         //          history.push(
         //             `${SCREEN_NAME.WORKSPACE_SETTINGS}/${record?._id}`
         //          )
         //       }
         //    >
         //       {text}
         //    </div>
         // ),
      },
      {
         title: "Date",
         dataIndex: "date",
         key: "date",
      },
      {
         title: "Workspaces",
         dataIndex: "url",
         key: "url",
         render: (url, record) => {
            return (
               <div className="link-url" onClick={() => window.open(url)}>
                  {url}
               </div>
            )
         },
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
                     "bullet-active": record?.status === "Paid",
                     "bullet-cancel": record?.status === "Failed",
                     "bullet-yellow": record.status === "Pending",
                  })}
               />{" "}
               {record?.status}
            </div>
         ),
      },
      {
         title: "Total (Inc.Tax)",
         key: "total",
         dataIndex: "total",
         width: 150,
      },
   ]

   return (
      <div className="invoice">
         <div>
            <div className="d-flex align-items-center justify-content-between">
               <Typography.Title level={1} style={{ margin: 0 }}>
                  Invoices
               </Typography.Title>
               <div className="w-50 d-flex align-items-center pr-5">
                  <Input.Search
                     placeholder="Input invoice number, work email or workspace's URL"
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
               // loading={loading}
               columns={columns}
               dataSource={
                  valueSearch.length > 0 ? listInvoiceSearch : listInvoice
               }
               // scroll={{ x: 1600 }}
            />
         </div>
      </div>
   )
}

export default Invoices
