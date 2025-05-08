import { screen, waitFor } from "@testing-library/react";
import { AddUserComponent } from "./AddUserForm.setup.test";
import userEvent from "@testing-library/user-event";
import { beInDom } from "@Tests/testFunction.test";

interface FillFormInterface {
    username?: string;
    phone?: string;
}
export const fillForm = async ({
    username,
    phone,
}: FillFormInterface) => {
    const usernameInput = screen.getByLabelText(/User name/);
    const phoneInput = screen.getByLabelText(/Phone:/);

    // clear
    await userEvent.clear(usernameInput)
    await userEvent.clear(phoneInput)
    
    // change(type)
    username && (await userEvent.type(usernameInput, username));
    phone && (await userEvent.type(phoneInput, phone));
    await userEvent.click(screen.getByRole("button",{name:"Create User"}));
};
interface UpdateUserInterface {
    username?: string;
    phone?: string;
    responseMessage: string;
    testName: string;
}

const updateUser: UpdateUserInterface[] = [
    {
        username: "",
        testName: "empty username",
        responseMessage: "name is a required field",
    },
    {
        username: "I am not a real userName !",
        testName: "username more than 25 characters",
        responseMessage: "name must be at most 25 characters",
    },
    {
        username: "1",
        testName: "username less than 2 characters",
        responseMessage: "name must be at least 2 characters",
    },
    {
        username: "",
        testName: "empty phone",
        responseMessage: "phone is a required field",
    },
    {
        phone: "0111111111111111",
        testName: "phone more than 15 characters",
        responseMessage: "your mobile is not valid!",
    },
    {
        phone: "0123456789",
        testName: "phone less than 11 characters",
        responseMessage: "phone must be at least 11 characters",
    },
    {
        phone: "hello world!",
        testName: "not valid phone",
        responseMessage: "your mobile is not valid!",
    },
];

describe.each(updateUser)(
    "update user form validation",
    ({ responseMessage, testName, username, phone }) => {
        it(testName, async () => {
            // assert
            <AddUserComponent />

            // act
            await fillForm({ username, phone });
            
            // assert
            await waitFor(() => {
                beInDom(screen.getByText(responseMessage));
            });
        });
    }
);
