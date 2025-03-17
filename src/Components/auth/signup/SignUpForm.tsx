'use client';

import type { SignUpFormValuesInterface } from '@Interfaces/forms';
import { object, string } from 'yup';
import Form from "./SignUpFormLogic";
import { withFormik } from 'formik';

const validationSchema = object({
    name:string().required().min(4).max(25),
    phone:string().required().min(11).max(15).matches(/^[\+|0][1-9]{1}[0-9]{7,11}$/ ,'your mobile is not valid!')
})
interface SignUpFormPropsInterface{
    handleSubmit: (x:any) => void
}
const SignUpForm = withFormik<SignUpFormPropsInterface,SignUpFormValuesInterface>({
    mapPropsToValues: () => ({
        name:'',
        phone:''
    }),
    validationSchema,
    handleSubmit : (values:SignUpFormValuesInterface,{ props }:{props:SignUpFormPropsInterface})=>{
        props.handleSubmit(values)
    }
})(Form)

export default SignUpForm