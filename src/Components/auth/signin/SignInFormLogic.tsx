import { LoginFormValuesInterface } from "@Contracts/auth";
import { FormikProps } from "formik";
import Button from "../Button";
import Input from "../Input";
import Link from "next/link";



const Form = ({
    values,
    handleChange,
    handleSubmit,
}: FormikProps<LoginFormValuesInterface>) => {
    const { password, email } = values;
    return (
        <div className='mt-10 sm:mx-auto border p-6 rounded shadow sm:w-full sm:max-w-sm'>
            <form
                className='space-y-6'
                autoComplete='off'
                onSubmit={handleSubmit}
            >
                <Input
                    setValue={handleChange}
                    value={email}
                    label='Email Address'
                    name='email'
                />
                <Input
                    value={password}
                    setValue={handleChange}
                    inputType='password'
                    label='Password'
                    name='password'
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