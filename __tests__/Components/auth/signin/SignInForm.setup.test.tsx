import type { LoginFormValuesInterface } from "@Interfaces/forms";
import { Bounce, ToastContainer } from "react-toastify";
import { beInDom } from "@Tests/testFunction.test";
import { showAuthToast } from "@Contracts/toast";
import SignInForm from "@Auth/signin/SignInForm";
import { screen } from "./SignInForm.api.test";
import { LoginApi } from "@/helpers/authApi";
import { useRouter } from "next/navigation";
import {
    addPhoneVerifyToken,
    useAuthDispatch,
    useAuthState,
} from "@Context/authentication";

it("renders sign in form elements correctly", () => {
    beInDom(screen.getByRole("textbox", { name: "Mobile Phone:" }));
    beInDom(screen.getByRole("button", { name: "Login" }));
});

jest.mock("@helpers/authApi", () => ({
    LoginApi: jest.fn(),
}));
export const pushMock = jest.fn();
jest.mock("next/navigation", () => ({
    useRouter: () => ({
        push: pushMock,
    }),
}));
const DisplayVerifyToken = () => (
    <div data-testid='verifyToken'>{useAuthState().phoneVerifyToken}</div>
);

export const RenderWithContext = () => {
    const { push } = useRouter();
    const dispatch = useAuthDispatch();
    const handleSubmit = async (
        values: LoginFormValuesInterface
    ): Promise<void> => {
        const { data, status, errors } = await LoginApi(values);
        showAuthToast(
            true,
            "Your verify code is " + data?.code,
            status,
            200,
            errors
        );
        if (status === 200) {
            dispatch(addPhoneVerifyToken(data?.token));
            push("login-verify");
        }
    };
    return (
        <>
            <SignInForm handleSubmit={handleSubmit} />
            <DisplayVerifyToken />
            <ToastContainer
                position='bottom-right'
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick={false}
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme='light'
                transition={Bounce}
            />
        </>
    );
};
