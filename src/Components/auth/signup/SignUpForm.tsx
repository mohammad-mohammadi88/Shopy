import { SignUpFormValuesInterface } from "@Contracts/auth";
import Form from "./SignUpFormLogic";
import { object, string } from "yup";
import { withFormik } from "formik";



const validationSchema = object({
    name: string().required().min(4),
    email: string().required().email(),
    password: string().required().min(8),
});

const SignUpForm = withFormik<{}, SignUpFormValuesInterface>({
    mapPropsToValues: () => ({
        password: "",
        name: "",
        email: "",
    }),
    validationSchema,
    handleSubmit: (values) => {
        console.log(values);
    },
})(Form);

export default SignUpForm;
