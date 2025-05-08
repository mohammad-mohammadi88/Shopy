import { productValidationSchema } from "@App/panel/admin/products/add/page";
import AddProductForm from "@Panel/admin/Products/AddProductForm";
import { render, screen } from "@testing-library/react";
import { beInDom } from "@Tests/testFunction.test";
import { Formik } from "formik";

const handleSubmit = jest.fn();
export const AddProductComponent = () => (
    <Formik
        initialValues={{
            price: undefined,
            title: "",
            category: "Back-end",
            body: "",
        }}
        validationSchema={productValidationSchema}
        onSubmit={handleSubmit}
    >
        {({ values, handleChange,handleSubmit, ...props }) => (
            <AddProductForm
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
    render(<AddProductComponent />);
})

describe("AddProductForm tests", () => {
    it("displays element", () => {
        beInDom(screen.getByLabelText("Product name:"));
        beInDom(screen.getByLabelText("Discription:"));
        beInDom(screen.getByLabelText("Price:"));
        beInDom(screen.getByLabelText("Category:"));
        beInDom(screen.getByText("Cancel"));
        beInDom(screen.getByText("Create product"));
        expect(screen.getByRole("link", { name: "Cancel" })).toHaveAttribute(
            "href",
            "/panel/admin/products"
        );
        expect(screen.getByRole("combobox")).toHaveValue("Back-end")
        expect(screen.getAllByRole('option')).toHaveLength(7)
    });
});
