'use client';
import MobileDisclosureButton from "./MobileDisclosureButton";
import MobileDisclosurePanel from "./MobileDisclosurePanel";
import DesktopLeftSideMenu from "./DesktopLeftSideMenu";
import { Disclosure } from "@headlessui/react";
import RightSideMenu from "./RightSideMenu";
import useAuth from "@Hooks/useAuth";
import { FC } from "react";

export interface NavigationInterface {
    name: string;
    href: string;
}
const NavbarContainer: FC = () => {
    const { user, isSuccess,isFetching } = useAuth();
    const navigation = !user
        ? [
            { name: "About us", href: "/about" },
            { name: "Login", href: "/auth/login" },
            { name: "Sign Up", href: "/auth/register" },
        ]
        : [{ name: "About us", href: "/about" }];
    return (
        <Disclosure as='nav' className='shadow-2xl'>
            <div className='mx-auto max-w-7xl px-2 sm:px-6 lg:px-8'>
                <div className='relative flex h-16 items-center justify-between'>
                    <MobileDisclosureButton />
                    {(isFetching || isSuccess) && <DesktopLeftSideMenu navigation={navigation} />}
                    {user && isSuccess && <RightSideMenu />}
                </div>
            </div>
            {(isFetching || isSuccess) && <MobileDisclosurePanel navigation={navigation} />}
        </Disclosure>
    );
};

export default NavbarContainer;
