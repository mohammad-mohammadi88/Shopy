import { FolderIcon, HomeIcon, UsersIcon } from "@heroicons/react/24/outline";
import { render, screen } from "@testing-library/react";
import DesktopSidebar from "@Panel/DesktopSidebar";
import { beInDom } from "@Tests/testFunction.test";

// Before Each
beforeEach(() => {
    const navigation = [
        { name: "Dashboard", href: "/panel/admin", icon: HomeIcon },
        { name: "Users", href: "/panel/admin/users", icon: UsersIcon },
        { name: "Products", href: "/panel/admin/products", icon: FolderIcon },
    ];
    render(<DesktopSidebar navigation={navigation} />);
});

describe("DesktopSidebar tests", () => {
    it("display company image and NavLink", () => {
        beInDom(screen.getByAltText("Your Company"));
        const navLinks = screen.getAllByRole('link');
        expect(navLinks).toHaveLength(3);
        beInDom(screen.getByText("Dashboard"))
    });
});
