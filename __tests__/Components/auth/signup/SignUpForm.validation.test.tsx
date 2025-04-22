import { screen, waitFor } from '@testing-library/react';
import { beInDom, fillSignUpForm } from './SignUpForm.api.test';

interface validateSignUpFormInputsInterface {
    username: string;
    phone: string;
    responseMessage: string;
    testName: string;
}

const validateFormInputs: validateSignUpFormInputsInterface[] = [
    {
        username: "",
        phone: "012345678900",
        testName: "shows required message when username is empty",
        responseMessage: "name is a required field",
    },
    {
        username: "hfjdkjfhjkds",
        phone: "",
        testName: "shows required message when phone is empty",
        responseMessage: "phone is a required field",
    },
    {
        username: "123",
        phone: "012345678900",
        testName: "shows error message when username is less than 4 characters",
        responseMessage: "name must be at least 4 characters",
    },
    {
        username: "hi my name is text. I am here to make error!",
        phone: "012345678900",
        testName:
            "shows error message when username is more than 25 characters",
        responseMessage: "name must be at most 25 characters",
    },
    {
        username: "mohammad",
        phone: "12345",
        testName: "shows error message when phone is less than 11 characters",
        responseMessage: "phone must be at least 11 characters",
    },
    {
        username: "mohammad",
        phone: "1234567891548758458454645454",
        testName: "shows error message when phone is more than 15 characters",
        responseMessage: "phone must be at most 15 characters",
    },
    {
        username: "mohammad",
        phone: "I'm not a phone",
        testName: "shows error message when phone is invalid with regex",
        responseMessage: "your mobile is not valid!",
    },
];
describe.each(validateFormInputs)(
    "sign up form input validations",
    ({ responseMessage, phone, testName, username }) => {
        it(testName, async () => {
            // act
            await fillSignUpForm({ username, phone });

            // assert
            await waitFor(() => {
                beInDom(screen.getByText(responseMessage));
            });
        });
    }
);
