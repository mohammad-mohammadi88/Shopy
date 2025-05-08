import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { beInDom } from "@Tests/testFunction.test";
import { ToastContainer } from "react-toastify";
import Navbar from "@Panel/Navbar";
import { useState } from "react";
import { mockAnimationsApi } from 'jsdom-testing-mocks'
mockAnimationsApi()

// mocking
const pushMock = jest.fn();
jest.mock("next/navigation", () => ({ useRouter: () => ({ push: pushMock }) }));
jest.mock("@hooks/useAuth", () => ({
    __esModule: true,
    default: jest.fn().mockImplementation(() => ({
        refetch: jest.fn(),
        user: { id: 1 },
    })),
}));
const deleteAccountMock = jest.fn();
jest.mock("@helpers/userApi", () => ({
    useDeleteUser: () => ({
        mutate: deleteAccountMock,
        isSuccess: true,
        error: null,
    }),
}));
jest.mock("@index/IndexLayout", () => ({
    queryClient: {
        invalidateQueries: jest.fn(),
    },
}));
const logOutMock = jest.fn();
jest.mock("@helpers/userToken", () => ({
    useRemoveUserToken: () => ({
        mutate: logOutMock,
        isSuccess: true,
    }),
}));

const NavbarContainer = () => {
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const userNavigation = [
        { name: "Home Page", href: "/" },
        { name: "Your Profile", href: "/panel/admin" },
    ];
    return (
        <>
            <div data-testid='sidebarOpen'>
                isSidebarOpen: {String(sidebarOpen)}
            </div>
                <Navbar
                    setSidebarOpen={setSidebarOpen}
                    userNavigation={userNavigation}
                    />
                <ToastContainer />
        </>
    );
};

// before each
beforeEach(() => {
    render(<NavbarContainer />);
});

describe("Navbar tests", () => {
    it("tests setting state", async () => {
        // act
        await userEvent.click(screen.getByText("Open sidebar"));

        // assert
        expect(screen.getByTestId("sidebarOpen")).toHaveTextContent(
            "isSidebarOpen: true"
        );
    });
    it('display user menu links', async () => {  
        // asert
        expect(screen.queryAllByRole('menuitem')).toHaveLength(0);

        // act
        await userEvent.click(screen.getByText("Open user menu"))

        // assert
        await waitFor(() => {
            expect(screen.getAllByRole('menuitem')).toHaveLength(4);
            beInDom(screen.getByRole('button',{name:"Delete Account"}));
            beInDom(screen.getByRole('button',{name:"Sign out"}));
            expect(screen.getByRole('menuitem',{name:"Home Page"})).toHaveAttribute('href',"/")
        })
    })
    it("logs out successfully", async () => {
        // act
        await userEvent.click(screen.getByText("Open user menu"))
        await userEvent.click(await screen.findByRole('button',{name:"Sign out"}));

        // assert
        await waitFor(() => {
            expect(logOutMock).toHaveBeenCalledTimes(1)
        })
    });
    it('deleted my account successfully', async () => {
        // act
        await userEvent.click(screen.getByText("Open user menu"))
        await userEvent.click(await screen.findByRole('button',{name:"Delete Account"}));

        // assert
        await waitFor(() => {
            expect(deleteAccountMock).toHaveBeenCalledTimes(1)
            beInDom(screen.getByText("Your Account deleted successfully!"))
        })
    })
});
