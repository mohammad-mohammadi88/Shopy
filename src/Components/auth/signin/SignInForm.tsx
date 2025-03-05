import { LoginFormValuesInterface } from "@Contracts/auth";
import { Bounce, toast } from "react-toastify";
import { LoginApi } from "@Apis/api";
import Form from "./SignInFormLogic";
import { object, string } from "yup";
import { withFormik } from "formik";
import Router from "next/router";
import { addPhoneVerifyToken } from "@Libs/authReducer";

interface LoginFormPropsInterface{
    dispatch : any
}

const handleSubmit = async (values:LoginFormValuesInterface,{ props }:{props:LoginFormPropsInterface}) => {
    const { data, status } = await LoginApi(values)
    if(status === 200){
        toast.info('Your varify code is ' + data.code, {
            position: "bottom-right",
            autoClose: 10000,
            hideProgressBar: false,
            closeOnClick: false,
            pauseOnHover: true,
            draggable: false,
            progress: undefined,
            theme: "light",
            transition: Bounce,
        });
        props.dispatch(addPhoneVerifyToken(data.token))
        Router.push('login-verify')
    } else {
        toast.error(status === 422 ? data.errors.phone : data.message, {
            position: "bottom-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: false,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
            transition: Bounce,
        });
    }
}

const validationSchema = object({
    phone:string().required().min(11).max(15).matches(/^[\+|0][1-9]{1}[0-9]{7,11}$/ ,'your mobile is not valid!')
});

const SignInForm = withFormik<LoginFormPropsInterface, LoginFormValuesInterface>({
    mapPropsToValues: () => ({
        phone: "",
    }),
    validationSchema,
    handleSubmit
})(Form);

export default SignInForm;
