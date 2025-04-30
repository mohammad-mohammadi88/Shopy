import NavbarContainer from "./Navbar/NavbarContainer";
import type { FC } from "react";

const notLoginNavigation = [
    { name: "About us", href: "/about" },
    { name: "Login", href: "/auth/login" },
    { name: "Sign Up", href: "/auth/register" },
];
const loginNavigation = [{ name: "About us", href: "/about" }];
const Navbar: FC = () => (
    <NavbarContainer
        loginNavigation={loginNavigation}
        notLoginNavigation={notLoginNavigation}
    />
);

export default Navbar;
