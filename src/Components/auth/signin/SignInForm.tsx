'use client';

import { LoginFormValuesInterface } from "@Contracts/auth";
import Form from "./SignInFormLogic";
import { object, string } from "yup";
import { withFormik } from "formik";


const validationSchema = object({
    phone:string().required().min(11).max(15)
    .matches(/^[\+|0][1-9]{1}[0-9]{7,11}$/ ,'your mobile is not valid!')
});

interface LoginFormPropsInterface{
    handleSubmit : (x:any) => void
}
const SignInForm = withFormik<LoginFormPropsInterface, LoginFormValuesInterface>({
    mapPropsToValues: () => ({
        phone: "",
    }),
    validationSchema,
    handleSubmit : (values:LoginFormValuesInterface,{ props }:{props:LoginFormPropsInterface})=>{
        props.handleSubmit(values)
    }
})(Form);

export default SignInForm;
