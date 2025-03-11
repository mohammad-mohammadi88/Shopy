"use client";

import { Option } from "@Panel/admin/Products/AddProductForm";
import { ErrorMessage } from "formik";
import { Field } from "formik";
import { FC, ReactNode, Ref } from "react";
interface Props {
    inputType?: string;
    ref?: Ref<null>;
    label: string;
    name: string;
    options?: Option[];
    className?: string;
    [key: string]: any;
}
const Input: FC<Props> = ({
    name,
    options,
    className,
    inputType = "text",
    label,
    ref,
    ...attrs
}): ReactNode => {
    return (
        <div>
            <label
                htmlFor={name}
                className='block text-sm/6 font-medium text-gray-900'
            >
                {label}:
            </label>
            {options ? (
                <Field
                    type={inputType}
                    name={name}
                    ref={ref}
                    id={name}
                    className={`mt-2 block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1  border-2  outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 outline focus:outline-indigo-600 sm:text-sm/6 ${ className ?? "" }`}
                    {...attrs}
                >
                    {options?.map(({ value }: Option,index:number) => (
                        <option key={index} value={value}>{value}</option>
                    ))}
                </Field>
            ) : (
                <Field
                    type={inputType}
                    name={name}
                    ref={ref}
                    id={name}
                    className={`mt-2 block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1  border-2  outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 outline focus:outline-indigo-600 sm:text-sm/6 ${ className ?? "" }`}
                    {...attrs}
                />
            )}

            <ErrorMessage
                name={name}
                component='div'
                className='text-red-500 text-sm '
            />
        </div>
    );
};

export default Input;
