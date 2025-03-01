import { signUpApi } from '@/apis/api';
import { object, string } from 'yup';
import Form from "./SignUpFormLogic";
import { withFormik } from 'formik';
import { SignUpFormValuesInterface } from '@Contracts/auth';
import { Bounce, toast } from 'react-toastify';
import Router from 'next/router';


const handleSubmit = async (values:SignUpFormValuesInterface)=>{
    const { status, message } =  await signUpApi(values)
    if(status === 201){
        toast.success('Your new account created!', {
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
        Router.push('/auth/login')
    } else {
        toast.error(message, {
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
    name:string().required().min(4),
    phone:string().required().min(11).max(15).matches(/^[\+|0][1-9]{1}[0-9]{7,11}$/ ,'your mobile is not valid!')
})
// 

const SignUpForm = withFormik<{},SignUpFormValuesInterface>({
    mapPropsToValues: () => ({
        name:'',
        phone:''
    }),
    validationSchema,
    handleSubmit
})(Form)

export default SignUpForm