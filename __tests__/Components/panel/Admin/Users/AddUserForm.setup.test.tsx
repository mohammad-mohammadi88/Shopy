import { userValidationSchema } from "@App/panel/user/update/[id]/page";
import AddUserForm from "@Panel/admin/Users/AddUserForm";
import { render, screen } from "@testing-library/react";
import { beInDom } from "@Tests/testFunction.test";
import { Formik } from "formik";

const handleSubmit = jest.fn();
export const AddUserComponent = () => (
    <Formik
        initialValues={{
            name: "sara",
            phone: "01234567890",
            isAdmin: true,
        }}
        validationSchema={userValidationSchema}
        onSubmit={handleSubmit}
    >
        {({ values, handleChange,handleSubmit, ...props }) => (
            <AddUserForm
                handleChange={handleChange}
                values={values}
                handleSubmit={handleSubmit}
                {...props}
            />
        )}
    </Formik>
);

// before each
beforeEach(() => {
    render(<AddUserComponent />);
})

describe("AddUserForm tests", () => {
    it("displays element", () => {
        beInDom(screen.getByLabelText("User name:"));
        beInDom(screen.getByLabelText("Phone:"));
        beInDom(screen.getByText("Cancel"));
        beInDom(screen.getByText("Create User"));
        expect(screen.getByRole("link", { name: "Cancel" })).toHaveAttribute(
            "href",
            "/panel/admin/users"
        );
    });
});
