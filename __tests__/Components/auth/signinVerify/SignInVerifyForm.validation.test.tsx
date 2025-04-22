import { screen, waitFor } from '@testing-library/react';
import { beInDom, fillValidationForm } from './SignInVerifyForm.api.test';

interface validateVerifyFormInputsInterface {
    code: string;
    responseMessage: string;
    testName: string;
}

const validateFormInputs: validateVerifyFormInputsInterface[] = [
    {
        code: "",
        testName: "shows required message when code is empty",
        responseMessage: "code is a required field",
    },
    {
        code: "12345",
        testName: "shows error message when code is not equal to 6 numbers",
        responseMessage: "code must be exactly 6 characters",
    },
    {
        code: "1234567",
        testName: "shows error message when code is not equal to 6 numbers",
        responseMessage: "code must be exactly 6 characters",
    },
    {
        code: "Igt",
        testName: "shows error message when code is not number with regex",
        responseMessage: "Only number is allowed",
    },
];
describe.each(validateFormInputs)(
    "sign in verify form input validations",
    ({ responseMessage, code, testName }) => {
        it(testName, async () => {
            // act
            await fillValidationForm(code);

            // assert
            await waitFor(() => {
                beInDom(screen.getByText(responseMessage));
            });
        });
    }
);
