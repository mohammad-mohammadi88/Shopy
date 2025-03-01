import { LoginFormValuesInterface } from "@Contracts/auth";
import Form from "./SignInFormLogic";
import { object, string } from "yup";
import { withFormik } from "formik";
import Router from "next/router";
import { LoginApi } from "@Apis/api";
import { Bounce, toast } from "react-toastify";

const handleSubmit = async (values:LoginFormValuesInterface,{ props }:any) => {
    const { status, data } = await LoginApi(values)
    if(status === 200){
        props.setCookies('shopy-token',data.token,{
            maxAge: 7 * 60 * 60 * 24
        })
        toast.success('Hello '+data.name, {
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
        Router.push('/dashboard')
    } else {
        toast.error(status === 400 ? data : data.errors.email, {
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
    email: string().required().email(),
    password: string().required().min(6),
});
interface LoginFormProps{
    setCookies:any
}
const SignInForm = withFormik<LoginFormProps, LoginFormValuesInterface>({
    mapPropsToValues: () => ({
        email: "",
        password: "",
    }),
    validationSchema,
    handleSubmit
})(Form);

export default SignInForm;
