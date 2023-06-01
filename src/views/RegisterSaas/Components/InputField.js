import { Input, Typography } from "antd"
import classNames from "classnames"
import React from "react"

const InputField = ({
   setValue,
   errors,
   name,
   label,
   inputProps,
   className,
   watch,
   hint,
}) => {
   return (
      <div className={classNames(className)}>
         <div className="d-flex align-items-center justify-content-between">
            <label className="mr-3">{label}</label>
            {inputProps?.maxLength && watch && (
               <div>
                  {watch(name) ? watch(name)?.length : "0"}/
                  {inputProps.maxLength}
               </div>
            )}
         </div>

         {inputProps?.type === "textarea" ? (
            <Input.TextArea
               status={errors?.[name] ? "error" : null}
               size="large"
               onChange={(e) => setValue(name, e.target.value)}
               {...inputProps}
            />
         ) : inputProps?.type === "password" ? (
            <Input.Password
               status={errors?.[name] ? "error" : null}
               size="large"
               onChange={(e) => setValue(name, e.target.value)}
               {...inputProps}
            />
         ) : (
            <Input
               status={errors?.[name] ? "error" : null}
               size="large"
               onChange={(e) => setValue(name, e.target.value)}
               {...inputProps}
            />
         )}
         {hint && (
            <Typography.Text italic>
               {hint}
            </Typography.Text>
         )}
         {errors?.[name] && (
            <Typography.Text type="danger">
               {errors?.[name]?.message}
            </Typography.Text>
         )}
      </div>
   )
}

export default InputField
