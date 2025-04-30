import NavbarContainer from "@Index/Navbar/NavbarContainer";
import { QueryClientProvider } from "@tanstack/react-query";
import { render, screen } from "@testing-library/react";
import { queryClient } from "@Index/IndexLayout";
import useAuth from "@/hooks/useAuth";
import userEvent from "@testing-library/user-event";

jest.mock("@/hooks/useAuth", () => ({
    __esModule: true,
    default: jest
        .fn((s) => s)
        .mockImplementationOnce(() => ({
            user: null,
            isSuccess: false,
            refetch: jest.fn(),
        }))
        .mockImplementation(() => ({
            user: { name: "john" },
            isSuccess: true,
            refetch: jest.fn(),
        })),
}));
export const pushMock = jest.fn();
jest.mock("next/navigation", () => ({
    useRouter: () => ({
        push: pushMock,
    }),
}));
beforeEach(() => {
    (useAuth as jest.Mock).mockClear();
    const notLoginNavigation = [
        { name: "About us", href: "/about" },
        { name: "Login", href: "/auth/login" },
        { name: "Sign Up", href: "/auth/register" },
    ];
    const loginNavigation = [{ name: "About us", href: "/about" }];
    render(
        <QueryClientProvider client={queryClient}>
            <NavbarContainer
                loginNavigation={loginNavigation}
                notLoginNavigation={notLoginNavigation}
            />
        </QueryClientProvider>
    );
});
describe("MobileDisclosurePanel tests", () => {
    it("displays navigation desktop and mobile links when user is logined successfully", async () => {
        // assert
        const navigationLinks = screen.getAllByRole("link");
        expect(navigationLinks).toHaveLength(3);
        expect(navigationLinks[0]).toHaveAttribute("href", "/about");

        // act
        await userEvent.click(screen.getByText(/Open Mobile Navbar/i));

        // assert
        expect(screen.getAllByRole("link")).toHaveLength(6);
    });
    it("displays navigation desktop and mobile links when user is not logined successfully", async () => {
        // assert
        const navigationLinks = screen.getAllByRole("link");
        expect(navigationLinks).toHaveLength(1);
        expect(navigationLinks[0]).toHaveAttribute("href", "/about");

        // act
        await userEvent.click(screen.getByText(/Open Mobile Navbar/i));

        // assert
        expect(screen.getAllByRole("link")).toHaveLength(2);
    });
    it('shows hello message to logined user',()=> {
        expect(screen.getByText(/Hello John/i)).toBeInTheDocument()
    })
    it("opens user menu when clicked on user icon", async () => {
        // act
        expect(await screen.findByText(/Open User Menu/)).toBeInTheDocument();
        await userEvent.click(await screen.findByText(/Open User Menu/));
        
        // assert
        
        expect(await screen.findByText("Your Profile")).toBeInTheDocument();
        expect(await screen.findByText("Edit Profile")).toBeInTheDocument();
        expect(await screen.findByText("Sign out")).toBeInTheDocument();
    });
});
