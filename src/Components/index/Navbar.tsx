"use client";

import NavbarContainer from "./Navbar/NavbarContainer";
import useAuth from "@Hooks/useAuth";
import type { FC } from "react";

const Navbar: FC = () => {
    const { isFetched } = useAuth();
    return <>{isFetched && <NavbarContainer />}</>;
};
export default Navbar;
