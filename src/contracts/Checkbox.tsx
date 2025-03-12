"use client";

import { Field } from "formik";
import { FC, ReactNode } from "react";
interface Props {
    label: string;
    name: string;
    className?: string;
    [key: string]: any;
    checked ?:boolean
}
const Checkbox: FC<Props> = ({
    name,
    className,
    label,
    checked,
    ...attrs
}): ReactNode => {
    return (
        <div className="flex items-center">
            <Field
                type="checkbox"
                name={name}
                checked={checked}
                id={name}
                className={` h-5 w-5 accent-green-700 rounded-md mr-1.5  text-base text-gray-900 outline-1 -outline-offset-1  border-2  outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 outline focus:outline-indigo-600 sm:text-sm/6 ${ className ?? "" }`}
                {...attrs}
            />
            <label
                htmlFor={name}
                className='text-base/6 font-medium text-gray-900'
            >
                {label}
            </label>
        </div>
    );
};

export default Checkbox;
