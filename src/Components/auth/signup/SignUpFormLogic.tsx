'use client';

import type { SignUpFormValuesInterface } from "@Interfaces/forms";
import { type ReactNode, useEffect, useRef } from "react";
import type { FormikProps } from "formik";
import Button from "@Contracts/Button";
import Input from "@Contracts/Input";
import Link from "next/link";

const Form = ({
    values,
    handleChange,
    handleSubmit,
}: FormikProps<SignUpFormValuesInterface>): ReactNode => {
    const { phone, name } = values;
    const ref = useRef<HTMLInputElement | any>(null)
    useEffect(()=>{
        ref?.current?.focus()
    },[ref])
    return (
        <div className='mt-10 sm:mx-auto border p-6 rounded shadow sm:w-full sm:max-w-sm'>
            <form
                className='space-y-6'
                autoComplete='off'
                onSubmit={handleSubmit}
            >
                <Input 
                    name="name"
                    value={name}
                    label="UserName"
                    onChange={handleChange}
                    ref={ref}
                />
                <Input 
                    name="phone"
                    value={phone}
                    onChange={handleChange}
                    label="Mobile Phone"
                />

                <Button value='Sign Up' className='flex w-full justify-center rounded-md bg-indigo-600 px-3 py-2 text-sm/6 font-semibold text-white shadow-xs hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600'/>
            </form>
            <div className='mt-3 underline hover:no-underline text-sm text-blue-700'>
                <Link href='login'>I already have an account</Link> 
            </div>
        </div>
    );
};
export default Form