import { render,screen } from '@testing-library/react';
import { beInDom } from '@Tests/testFunction.test';
import { redirect } from 'next/navigation';
import AuthLayout from "@App/auth/layout"
import useAuth from '@/hooks/useAuth';

// mocking
jest.mock('@hooks/useAuth', () => ({
    __esModule: true,
    default: jest.fn().mockImplementation(() => ({ user: { isAdmin: true } }))
}))
jest.mock("next/navigation", () => ({ redirect: jest.fn() }))

describe('auth layout tests', () => {
    it('redirects to user panel', () => {
        // arrange
        (useAuth as jest.Mock).mockImplementationOnce(() => ({
            user: {
                isAdmin: false
            }
        }))
        render(<AuthLayout>hello</AuthLayout>)

        // assert
        expect(redirect).toHaveBeenCalledWith('/panel/user')
    })
    it('shows children when user is undefined', () => {
        // arrange
        (useAuth as jest.Mock).mockImplementationOnce(() => ({
            user: undefined
        }))
        render(<AuthLayout>hello</AuthLayout>)

        // assert
        beInDom(screen.getByText("hello"))
    })
    it('redirects to admin panel', () => {
        // arrange
        jest.clearAllMocks()
        render(<AuthLayout>hello</AuthLayout>)

        // assert
        expect(redirect).toHaveBeenCalledWith('/panel/admin')

    })
})