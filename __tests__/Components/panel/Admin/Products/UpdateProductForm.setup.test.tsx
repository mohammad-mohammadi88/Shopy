import { productValidationSchema } from "@App/panel/admin/products/add/page";
import UpdateProductForm from "@Panel/admin/Products/UpdateProductForm";
import { render, screen } from "@testing-library/react";
import { beInDom } from "@Tests/testFunction.test";
import { Formik } from "formik";

const handleSubmit = jest.fn();
export const UpdateProductComponent = () => (
    <Formik
        initialValues={{
            price: 85,
            title: "Back end",
            category: "Back-end",
            body: "Back end course",
        }}
        validationSchema={productValidationSchema}
        onSubmit={handleSubmit}
    >
        {({ values, handleChange,handleSubmit, ...props }) => (
            <UpdateProductForm
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
    render(<UpdateProductComponent />);
})

describe("AddProductForm tests", () => {
    it("displays element", () => {
        beInDom(screen.getByLabelText("Product name:"));
        beInDom(screen.getByLabelText("Discription:"));
        beInDom(screen.getByLabelText("Price:"));
        beInDom(screen.getByLabelText("Category:"));
        beInDom(screen.getByText("Cancel"));
        beInDom(screen.getByText("Update product"));
        expect(screen.getByRole("link", { name: "Cancel" })).toHaveAttribute(
            "href",
            "/panel/admin/products"
        );
        expect(screen.getByRole("combobox")).toHaveValue("Back-end")
        expect(screen.getAllByRole('option')).toHaveLength(7)
    });
    it('displays default values', () => {
        expect(screen.getByLabelText("Product name:")).toHaveValue("Back end")
        expect(screen.getByLabelText("Discription:")).toHaveValue("Back end course")
        expect(screen.getByLabelText("Price:")).toHaveValue(85)
    })
});
