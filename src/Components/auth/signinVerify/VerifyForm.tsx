'use client';

import { VerifyFormValuesInterface } from "@/interfaces/forms";
import Form from "./VerifyFormLogic";
import { object, string } from "yup";
import { withFormik } from "formik";

const validationSchema = object({
    code: string().required().matches(/^[0-9]+$/,'Only number is allowed').length(6),
});
interface VerifyFormPropsInterface{
    handleSubmit: (x:any) => void
}
const VerifyForm = withFormik<VerifyFormPropsInterface, VerifyFormValuesInterface>({
    mapPropsToValues: () => ({
        code: ""
    }),
    validationSchema,
    handleSubmit : ({code}:VerifyFormValuesInterface,{ props }:{props:VerifyFormPropsInterface})=>{
        props.handleSubmit(code)
    }
})(Form);

export default VerifyForm;
