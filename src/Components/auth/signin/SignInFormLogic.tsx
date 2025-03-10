'use client';

import { LoginFormValuesInterface } from "@Contracts/auth";
import { ReactNode, useEffect, useRef } from "react";
import { FormikProps } from "formik";
import Button from "../../../contracts/Button";
import Input from "../../../contracts/Input";
import Link from "next/link";

const Form = ({
    values,
    handleChange,
    handleSubmit,
}: FormikProps<LoginFormValuesInterface>) :ReactNode => {
    const { phone } = values;
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
                    value={phone}
                    label='Mobile Phone'
                    name='phone'
                    ref={ref}
                />
                <Button value='Login' />
            </form>
            <div className='mt-3 underline hover:no-underline text-sm text-blue-700'>
                <Link href='register'>Make a new account</Link>
            </div>
        </div>
    );
};

export default Form