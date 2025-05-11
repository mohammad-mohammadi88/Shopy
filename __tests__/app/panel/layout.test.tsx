import { render, screen } from '@testing-library/react';
import PanelLayout from "@App/panel/layout"
import useAuth from '@Hooks/useAuth';
import { ToastContainer } from 'react-toastify';
import { beInDom } from '@Tests/testFunction.test';
import { redirect } from 'next/navigation';

// mocking
jest.mock("@hooks/useAuth", () => ({
    __esModule: true,
    default: jest.fn().mockImplementation(() => ({
        user: undefined,
        isPending: true,
        isSuccess: true,
        error: "error",
    }))
}))
jest.mock("next/navigation", () => ({ redirect: jest.fn() }))

const SampleComponent = <>
    <PanelLayout>hello</PanelLayout>
    <ToastContainer />
</>

describe('layout tests', () => {
    it('displays error toast and redirects to login page', () => {
        // arrange
        render(SampleComponent)

        // assert
        beInDom(screen.getByText("Please login first"))
        expect(redirect).toHaveBeenCalledWith("/auth/login")
    })
    it('displays Loading message while fetching', () => {
        // arrange
        (useAuth as jest.Mock).mockImplementation(() => ({
            isPending:true
        }))
        render(SampleComponent)

        // assert
        beInDom(screen.getByText("Loading..."))
    })
    it('displays children when everything is ok', () => {
        // arrange
        (useAuth as jest.Mock).mockImplementation(() => ({
            isSuccess:true
        }))
        render(SampleComponent)

        // assert
        beInDom(screen.getByText("hello"))
    })
})