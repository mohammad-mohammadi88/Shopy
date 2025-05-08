import { userValidationSchema } from "@App/panel/user/update/[id]/page";
import { beInDom, notBeInDom } from "@Tests/testFunction.test";
import { render, screen } from "@testing-library/react";
import UpdateUserForm from "@Panel/UpdateUserForm";
import useAuth from "@Hooks/useAuth";
import { Formik } from "formik";

jest.mock("@hooks/useAuth", () => ({
    __esModule: true,
    default: jest.fn().mockImplementation(() => ({
        user: { isAdmin: true },
    })),
}));

const handleSubmit = jest.fn();
export const UpdateUserComponent = () => (
    <Formik
        initialValues={{
            name: "sara",
            phone: "01234567890",
            isAdmin: 0,
        }}
        validationSchema={userValidationSchema}
        onSubmit={handleSubmit}
    >
        {({ values, handleChange, ...props }) => (
            <UpdateUserForm
                handleChange={handleChange}
                values={values}
                {...props}
            />
        )}
    </Formik>
);

describe("UpdateUserForm tests", () => {
    it("displays element with user", () => {
        // arrange
        (useAuth as jest.Mock).mockImplementationOnce(() => ({
            user: { isAdmin: false },
        }));
        render(<UpdateUserComponent />);

        // assert
        beInDom(screen.getByLabelText("User name:"));
        beInDom(screen.getByLabelText("Phone:"));
        beInDom(screen.getByText("Cancel"));
        beInDom(screen.getByText("Update User"));
        expect(screen.getByRole("link", { name: "Cancel" })).toHaveAttribute(
            "href",
            "/panel/user"
        );
        notBeInDom(
            screen.queryByLabelText("Is this user an admin (not admin)")
        );
    });
    it("displays element with Admin", () => {
        // arrange
        render(<UpdateUserComponent />);

        // assert
        expect(screen.getByRole("link", { name: "Cancel" })).toHaveAttribute(
            "href",
            "/panel/admin/users"
        );
        beInDom(screen.getByLabelText("Is this user an admin (not admin)"));
    });
    it("displays default user info", () => {
        // arrange
        render(<UpdateUserComponent />);

        // assert
        expect(screen.getByLabelText("User name:")).toHaveValue("sara");
        expect(screen.getByLabelText("Phone:")).toHaveValue("01234567890");
        expect(
            screen.getByLabelText("Is this user an admin (not admin)")
        ).not.toBeChecked();
    });
});
