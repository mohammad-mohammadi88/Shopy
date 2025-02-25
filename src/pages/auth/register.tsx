import SignUpForm   from "@/Components/auth/signup/SignUpForm";
import Layout from "@AuthSignUp/Layout";
// import Button from "@AuthSignUp/Button";
// import Input from "@AuthSignUp/Input";
import type { NextPage } from "next";

const register: NextPage = () => {
    return (
        <Layout>
            <SignUpForm />
        </Layout>
    );
};

export default register;
