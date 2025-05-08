import { FolderIcon, HomeIcon, UsersIcon } from "@heroicons/react/24/outline";
import { render, screen, waitFor } from "@testing-library/react";
import { beInDom, notBeInDom } from "@Tests/testFunction.test";
import { mockAnimationsApi } from 'jsdom-testing-mocks';
import userEvent from "@testing-library/user-event";
import MobileSidebar from "@Panel/MobileSidebar";
import { useState } from "react";
mockAnimationsApi()

const SidebarContainer = () => {
    const [sidebarOpen, setSidebarOpen] = useState(true);
    const navigation = [
        { name: "Dashboard", href: "/panel/admin", icon: HomeIcon },
        { name: "Users", href: "/panel/admin/users", icon: UsersIcon },
        { name: "Products", href: "/panel/admin/products", icon: FolderIcon },
    ];
    return (
        <MobileSidebar
            setSidebarOpen={setSidebarOpen}
            sidebarOpen={sidebarOpen}
            navigation={navigation}
        />
    );
};

// Before Each
beforeEach(() => {
    render(<SidebarContainer />);
});

describe("MobileSidebar tests", () => {
    it("display company image and NavLink", () => {
        beInDom(screen.getByAltText("Your Company"));
        const navLinks = screen.getAllByRole('link');
        expect(navLinks).toHaveLength(3);
        beInDom(screen.getByText("Dashboard"))
    });
    it("hides menu when clicked on close button", async () => {
        // act
        await userEvent.click(screen.getByText("Close sidebar"));

        // assert
        await waitFor(() => {
            notBeInDom(screen.queryByAltText("Your Company"));
            const navLinks = screen.queryAllByRole('link');
            expect(navLinks).toHaveLength(0);
            notBeInDom(screen.queryByText("Dashboard"));
            notBeInDom(screen.queryByText("Close sidebar"));
        })
    })
});
