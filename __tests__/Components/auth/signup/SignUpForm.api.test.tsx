import type { SignUpFormValuesInterface } from "@Interfaces/forms";
import { render, screen, waitFor } from "@testing-library/react";
import { Bounce, ToastContainer } from "react-toastify";
import userEvent from "@testing-library/user-event";
import { showAuthToast } from "@Contracts/toast";
import SignUpForm from "@Auth/signup/SignUpForm";
import { useRouter } from "next/navigation";
import { signUpApi } from "@/helpers/authApi";

interface FormTypes {
    username?: string;
    phone?: string;
}

export const fillSignUpForm = async (info: FormTypes) => {
    const { username, phone } = info;
    username &&
        (await userEvent.type(
            screen.getByRole("textbox", { name: "UserName:" }),
            username
        ));
    phone &&
        (await userEvent.type(
            screen.getByRole("textbox", { name: "Mobile Phone:" }),
            phone
        ));

    await userEvent.click(screen.getByRole("button", { name: "Sign Up" }));
};
export const beInDom = (expects: any) => expect(expects).toBeInTheDocument();

jest.mock("@helpers/authApi", () => ({
    signUpApi: jest
        .fn((s) => s)
        .mockResolvedValue({
            status: 201,
            errors: [],
        }),
}));

const pushMock = jest.fn();
jest.mock("next/navigation", () => ({
    useRouter: () => ({
        push: pushMock,
    }),
}));
let handleSubmit: (values: SignUpFormValuesInterface) => Promise<void>;
// Before Each
beforeEach(() => {
    handleSubmit = async (values) => {
        const res = await signUpApi(values);
        const router = useRouter();
        showAuthToast(
            true,
            "Your new account created!",
            res.status,
            201,
            res.errors
        );
        if (res?.status === 201) router.push("login");
    };
    render(
        <>
            <SignUpForm handleSubmit={handleSubmit} />
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
});

it("renders sign up form elements correctly", () => {
    beInDom(screen.getByRole("textbox", { name: "UserName:" }));
    beInDom(screen.getByRole("textbox", { name: "Mobile Phone:" }));
    beInDom(screen.getByRole("button", { name: "Sign Up" }));
});

describe("SignUpForm api tests", () => {
    it("shows error when phone is taken", async () => {
        // arrange
        (signUpApi as jest.Mock).mockResolvedValueOnce({
            status: 400,
            errors: ["Phone is already taken"],
        });
        
        // act
        await fillSignUpForm({ username: "mohammad", phone: "09146360528" });

        // assert
        await waitFor(() =>
            beInDom(screen.getByText("Phone is already taken"))
        );
    });
    it("shows success toast when sign-up is successful", async () => {
        // act
        await fillSignUpForm({ username: "mohammad", phone: "09146360528" });

        // assert
        await waitFor(() =>
            beInDom(screen.getByText("Your new account created!"))
        );
        expect(signUpApi).toHaveBeenCalledWith({
            name: "mohammad",
            phone: "09146360528",
        });
    });
    it("redirects to login page after a successful sign-up", async () => {
        // act
        await fillSignUpForm({ username: "mohammad", phone: "09146360528" });

        // assert
        await waitFor(() => {
            expect(pushMock).toHaveBeenCalledWith("login");
        });
    });
});
