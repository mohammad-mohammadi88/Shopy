import { pushMock, RenderWithContext } from "./SignInForm.setup.test";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import AuthProvider from "@Context/authentication";
import { LoginApi } from "@/helpers/authApi";

export const beInDom = (expects: any) => expect(expects).toBeInTheDocument();
export const fillSignInForm = async (phone: string) => {
    const phoneInput = screen.getByRole("textbox", { name: "Mobile Phone:" });
    await userEvent.clear(phoneInput); 
    phone &&
        (await userEvent.type(
            phoneInput,
            phone
        ));

    await userEvent.click(screen.getByRole("button", { name: "Login" }));
};

jest.mock("@helpers/authApi", () => ({
    LoginApi: jest
        .fn((s) => s)
        .mockResolvedValue({
            status: 200,
            errors: [],
        }),
}));
// Before Each
beforeEach(() => {
    render(
        <AuthProvider>
            <RenderWithContext />
        </AuthProvider>
    )
});


describe("SignInForm api tests", () => {
    it("shows error when phone is taken", async () => {
        // arrange
        (LoginApi as jest.Mock).mockResolvedValueOnce({
            status: 400,
            errors: ["the phone not exists"],
        });
        
        // act
        await fillSignInForm("0541264651040");

        // assert
        await waitFor(() =>
            beInDom(screen.getByText("the phone not exists"))
        );
    });
    it("shows success toast when sign-in is successful", async () => {
        // act
        await fillSignInForm("09146360528");

        // assert
        await waitFor(() =>
            beInDom(screen.getByText(/Your verify code is 123456/i))
        );
    });
    it("redirects to login verify page after a successful login", async () => {
        // act
        await fillSignInForm("09146360528");

        // assert
        await waitFor(() => {
            expect(pushMock).toHaveBeenCalledWith("login-verify");
        });
    });
    it("saves right token in context", async () => {
        // act
        await fillSignInForm("09146360528");

        // assert
        expect(screen.getByTestId("verifyToken")).toHaveTextContent("token");
    });
});
