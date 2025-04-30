import { screen, waitFor } from '@testing-library/react';
import { fillSignInForm } from './SignInForm.api.test';
import { beInDom } from "@Tests/testFunction.test";

interface validateSignInFormInputsInterface {
    phone: string;
    responseMessage: string;
    testName: string;
}

const validateFormInputs: validateSignInFormInputsInterface[] = [
    {
        phone: "",
        testName: "shows required message when phone is empty",
        responseMessage: "phone is a required field",
    },
    {
        phone: "12345",
        testName: "shows error message when phone is less than 11 characters",
        responseMessage: "phone must be at least 11 characters",
    },
    {
        phone: "1234567891548758458454645454",
        testName: "shows error message when phone is more than 15 characters",
        responseMessage: "phone must be at most 15 characters",
    },
    {
        phone: "I'm not a phone",
        testName: "shows error message when phone is invalid with regex",
        responseMessage: "your mobile is not valid!",
    },
];
describe.each(validateFormInputs)(
    "sign in form input validations",
    ({ responseMessage, phone, testName }) => {
        it(testName, async () => {
            // act
            await fillSignInForm(phone);

            // assert
            await waitFor(() => {
                beInDom(screen.getByText(responseMessage));
            });
        });
    }
);
