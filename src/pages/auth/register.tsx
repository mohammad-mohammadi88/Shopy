import SignInLayout from "@Auth/signup";
import type { NextPage } from "next";
import FormsLayout from "@Auth/FormsLayout"

const register: NextPage = () => {
    return (
        <FormsLayout title="Sign up to Shopy">
            <SignInLayout />
        </FormsLayout>
    );
};

export default register;
