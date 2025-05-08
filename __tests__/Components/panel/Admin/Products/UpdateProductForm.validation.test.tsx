import { cleanup, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { beInDom } from "@Tests/testFunction.test";
import { UpdateProductComponent } from "./UpdateProductForm.setup.test";

interface FillFormInterface {
    title?: string;
    body?: string;
    price?: number
}
export const fillForm = async ({
    title,
    body,
    price
}: FillFormInterface) => {
    const productNameInput = screen.getByLabelText(/Product name/);
    const discriptionTextaria = screen.getByLabelText(/Discription:/);
    const priceInput = screen.getByLabelText(/Price:/);

    // clear
    await userEvent.clear(discriptionTextaria)
    await userEvent.clear(productNameInput)
    await userEvent.clear(priceInput)

    // change(type)
    title && (await userEvent.type(productNameInput, title));
    body && (await userEvent.type(discriptionTextaria, body));
    price && (await userEvent.type(priceInput, String(price)));
    await userEvent.click(screen.getByRole("button",{name:"Update product"}));
};
interface UpdateUserInterface {
    title?: string;
    body?: string;
    price?: number
    responseMessage: string;
    testName: string;
}

const updateUser: UpdateUserInterface[] = [
    {
        title: "",
        testName: "empty product title",
        responseMessage: "title is a required field",
    },
    {
        title: "I am not a real product title!",
        testName: "product title more than 25 characters",
        responseMessage: "title must be at most 25 characters",
    },
    {
        title: "123",
        testName: "product title less than 4 characters",
        responseMessage: "title must be at least 4 characters",
    },
    {
        price: undefined,
        testName: "empty price",
        responseMessage: "price is a required field",
    },
    {
        price: 1,
        testName: "price less than 2",
        responseMessage: "price must be greater than or equal to 2",
    },
    {
        body: "",
        testName: "empty body",
        responseMessage: "body is a required field",
    },
    {
        body: "hi",
        testName: "body less than 5 characters",
        responseMessage: "body must be at least 5 characters",
    }
];

describe.each(updateUser)(
    "update user form validation",
    ({ responseMessage, testName, price, body, title }) => {
        it(testName, async () => {
            // assert
            <UpdateProductComponent />

            // act
            await fillForm({ price, body, title });
            
            // assert
            await waitFor(() => {
                beInDom(screen.getByText(responseMessage));
            });
            cleanup()
        });
    }
);
