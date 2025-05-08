import { screen } from "./SignInVerifyForm.api.test";
import { beInDom } from "@Tests/testFunction.test";
import { VerifyPhoneApi } from "@/helpers/authApi";
import { showAuthToast } from "@Contracts/toast";
import { ToastContainer } from "react-toastify";
import VerifyForm from "@Auth/signinVerify";
import { useRouter } from "next/navigation";
import {
    addPhoneVerifyToken,
    useAuthDispatch,
    useAuthState,
} from "@Context/authentication";
import { useEffect } from "react";

// mocking
jest.mock("@helpers/authApi", () => ({
    VerifyPhoneApi: jest.fn(),
}));
export const pushMock = jest.fn();
jest.mock("next/navigation", () => ({
    useRouter: () => ({
        push: pushMock,
    }),
}));

it("renders sign in verify form elements correctly", () => {
    beInDom(screen.getByRole("textbox", { name: "Verify Code:" }));
    beInDom(screen.getByRole("button", { name: "Verify Code" }));
});
    
const DisplayVerifyToken = () => (
    <div data-testid='verifyToken'>{useAuthState().phoneVerifyToken}</div>
);
export const RenderWithContext = () => {
    const { push } = useRouter();
    const dispatch = useAuthDispatch();
    useEffect(() => {
        dispatch(addPhoneVerifyToken("token"));
    },[dispatch])

    const handleSubmit = async (code: number): Promise<void> => {
        const { status, data, errors } = await VerifyPhoneApi(code, "token");
        showAuthToast(false, "Hello " + data?.name, status, 200, errors);
        if (status === 200) {
            data.isAdmin ? push("/panel/admin") : push("/panel/user");
        }
    };
    return (
        <>
            <VerifyForm handleSubmit={handleSubmit} />
            <DisplayVerifyToken />
            <ToastContainer />
        </>
    );
};
