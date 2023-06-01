import { Cascader, Typography } from "antd"
import classNames from "classnames"
import React from "react"

const CascaderField = ({
   label,
   setValue,
   name,
   options,
   defaultValue,
   style,
   className,
   errors,
   cascaderProps,
   value,
   showSearch,
}) => {
   return (
      <div className={classNames(className)}>
         <label>{label}</label>
         <Cascader
            className="cascader-container"
            style={style}
            size="large"
            onChange={(value) => {
               setValue(name, value[0])
            }}
            options={options}
            defaultValue={defaultValue}
            allowClear={false}
            value={value}
            showSearch={showSearch}
            {...cascaderProps}
         />
         {errors?.[name] && (
            <Typography.Text type="danger">
               {errors?.[name]?.message}
            </Typography.Text>
         )}
      </div>
   )
}

export default CascaderField
