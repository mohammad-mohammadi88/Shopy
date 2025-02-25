import { FormikProps, withFormik } from 'formik';
import Input from './Input';
import Button from './Button';
import { object, string } from 'yup';
export interface initialFormValuesInterface {
    name: string;
    email: string;
    password: string;
}
const Form = (props:FormikProps<initialFormValuesInterface>) => {
    return (
        <div className='mt-10 sm:mx-auto border p-6 rounded shadow sm:w-full sm:max-w-sm'>
            <form className='space-y-6' autoComplete='off' onSubmit={props.handleSubmit}>
                <Input
                    setValue={props.handleChange}
                    value={props.values.name}
                    label="Name"
                    name='name'
                />
                <Input
                    setValue={props.handleChange}
                    value={props.values.email}
                    label="Email Address"
                    inputType='email'
                    name='email'
                />
                <Input
                    value={props.values.password}
                    setValue={props.handleChange}
                    inputType='password'
                    label="Password"
                    name='password'
                />
                <Button />
            </form>
        </div>
    )
}
const validationSchema = object({
    name:string().required().min(4),
    email:string().required().email(),
    password:string().required().min(8)
})
const SignUpForm = withFormik<{},initialFormValuesInterface>({
    mapPropsToValues: () => ({
        password:'',
        name:'',
        email:''
    }),
    validationSchema,
    handleSubmit: (values) => {
        console.log(values)
    }
})(Form)

export default SignUpForm