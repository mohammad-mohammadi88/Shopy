import { LoginFormValuesInterface } from "@Contracts/auth";
import Form from "./SignInFormLogic";
import { object, string } from "yup";
import { withFormik } from "formik";


const validationSchema = object({
    email: string().required().email(),
    password: string().required().min(6),
});

const SignInForm = withFormik<{}, LoginFormValuesInterface>({
    mapPropsToValues: () => ({
        email: "",
        password: "",
    }),
    validationSchema,
    handleSubmit: (values) => console.log(values),
})(Form);

export default SignInForm;
