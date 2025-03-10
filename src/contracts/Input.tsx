'use client';

import { ErrorMessage } from 'formik'
import { Field } from 'formik'
import { ChangeEventHandler, FC, ReactNode, Ref } from 'react'
interface Props{
    setValue?:ChangeEventHandler<HTMLInputElement>,
    inputType?:string,
    ref?:Ref<null>,
    value?: string | number,
    label:string,
    name:string,
    className?:string;
    [key:string]:any
}
const Input:FC<Props> = ({name,className,inputType='text',value,setValue,label,ref,...props}) :ReactNode => {
    return (
        <div>
            <label
                htmlFor={name}
                className='block text-sm/6 font-medium text-gray-900'
            >
                {label}:
            </label>
            <Field
                type={inputType}
                name={name}
                ref={ref}
                {...props}
                id={name}
                value={value}
                onChange={setValue}
                className={`mt-2 block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 outline focus:outline-indigo-600 sm:text-sm/6 ${className ?? ''}`}
            />
            <ErrorMessage name={name} component='div' className='text-rose-500 text-sm ' />
        </div>
    )
}

export default Input