import { pushMock, RenderWithContext } from "./SignInVerifyForm.setup.test";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import AuthProvider from "@Context/authentication";
import { beInDom } from "@Tests/testFunction.test";
import { VerifyPhoneApi } from "@Helpers/authApi";
export { screen }

export const fillValidationForm = async (code: string) => {
    const codeInput = screen.getByRole("textbox", { name: "Verify Code:" });
    await userEvent.clear(codeInput);
    code && (await userEvent.type(codeInput, code));

    await userEvent.click(screen.getByRole("button", { name: "Verify Code" }));
};

// Before Each
beforeEach(() => {
    render(
        <AuthProvider>
            <RenderWithContext />
        </AuthProvider>
    );
    (pushMock).mockClear()
});

const fakeUser = (isAdmin:boolean) => ({
    name: "max",
    isAdmin: Number(isAdmin),
})


describe("SignInVerifyForm api tests", () => {
    it("saves right token in context", async () => {
        expect(screen.getByTestId("verifyToken")).toHaveTextContent("token");
    });
    it("shows welcome message toast when verify is successful", async () => {
        // arrange
        (VerifyPhoneApi as jest.Mock).mockResolvedValue({
            data: fakeUser(true),
            status: 200,
            errors: [],
        });

        // act
        await fillValidationForm("123456");

        // assert
        await waitFor(() => beInDom(screen.getByText(/Hello max/i)));
    });
    it("shows error message toast when verify code is wrong", async () => {
        // arrange
        (VerifyPhoneApi as jest.Mock).mockResolvedValue({
            data: null,
            status: 422,
            errors: ["the code is not correct"],
        });

        // act
        await fillValidationForm("125487");

        
        // assert
        await waitFor(() => beInDom(screen.getByText(/the code is not correct/i)));
        
    });
    it("redirects to admin panel when verified client is admin", async () => {
        // arrange
        (VerifyPhoneApi as jest.Mock).mockResolvedValue({
            data: fakeUser(true),
            status: 200,
            errors: [],
        });

        // act
        await fillValidationForm("123456");

        // assert
        await waitFor(() => {
            expect(pushMock).toHaveBeenCalledWith("/panel/admin");
        });
    });
    it("redirects to user panel when verified client is user", async () => {
        // arrange
        (VerifyPhoneApi as jest.Mock).mockResolvedValue({
            data: fakeUser(false),
            status: 200,
            errors: [],
        });

        // act
        await fillValidationForm("123456");

        // assert
        await waitFor(() => {
            expect(pushMock).toHaveBeenCalledWith("/panel/user");
        });
    });
});
