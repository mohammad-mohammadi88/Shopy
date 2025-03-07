'use client';

import { SignUpFormValuesInterface } from "@Contracts/auth";
import { ReactNode, useEffect, useRef } from "react";
import { FormikProps } from "formik";
import Button from "../Button";
import Input from "../Input";
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
                    setValue={handleChange}
                    ref={ref}
                />
                <Input 
                    name="phone"
                    value={phone}
                    setValue={handleChange}
                    label="Mobile Phone"
                />

                <Button value='Sign Up' />
            </form>
            <div className='mt-3 underline hover:no-underline text-sm text-blue-700'>
                <Link href='login'>I already have an account</Link> 
            </div>
        </div>
    );
};
export default Form