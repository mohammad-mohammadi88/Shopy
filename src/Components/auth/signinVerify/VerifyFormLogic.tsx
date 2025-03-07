'use client';

import { VerifyFormValuesInterface } from "@Contracts/auth";
import { ReactNode, useEffect, useRef } from "react";
import { FormikProps } from "formik";
import Button from "../Button";
import Input from "../Input";
import Link from "next/link";

const Form = ({
    values,
    handleChange,
    handleSubmit,
}: FormikProps<VerifyFormValuesInterface>) :ReactNode => {
    const { code } = values;
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
                    setValue={handleChange}
                    value={code}
                    label='Verify Code'
                    name='code'
                    ref={ref}
                />
                <Button value='Verify Code' />
            </form>
            <div className='mt-3 underline hover:no-underline text-sm text-blue-700'>
                <Link href='register'>Make a new account</Link>
            </div>
        </div>
    );
};

export default Form