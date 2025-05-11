import LoginVerifyLayout from "@App/auth/login-verify/layout"
import { render, screen } from '@testing-library/react';
import { useAuthState } from '@/context/authentication';
import { beInDom } from '@Tests/testFunction.test';
import { redirect } from 'next/navigation';

// mocking
jest.mock("@context/authentication", () => ({
    useAuthState:jest.fn().mockImplementation(() => ({
        phoneVerifyToken: "phoneVerifyToken"
    }))
}))
jest.mock("next/navigation", () => ({ redirect: jest.fn() }))

describe('layout tests',() => {
    it('redirects to login when context is empty', () => {
        // arrange
        (useAuthState as jest.Mock).mockImplementationOnce(() => ({
            phoneVerifyToken: undefined
        }))
        render(<LoginVerifyLayout>hello</LoginVerifyLayout>)

        // assert
        expect(redirect).toHaveBeenCalledWith('login')
    })
    it('shows children when context is full', () => {
        // arrange
        render(<LoginVerifyLayout>hello</LoginVerifyLayout>)

        // assert
        beInDom(screen.getByText('hello'))
    })
})