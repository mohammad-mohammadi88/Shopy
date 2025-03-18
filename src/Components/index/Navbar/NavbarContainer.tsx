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
    const { user, isSuccess } = useAuth();
    const navigation = user
        ? [{ name: "About us", href: "/about" }]
        : [
            { name: "About-Us", href: "/about" },
            { name: "Login", href: "/auth/login" },
            { name: "Sign Up", href: "/auth/register" },
        ];
    return (
        <Disclosure as='nav' className='bg-white shadow-2xl'>
            <div className='mx-auto max-w-7xl px-2 sm:px-6 lg:px-8'>
                <div className='relative flex h-16 items-center justify-between'>
                    <MobileDisclosureButton />
                    <DesktopLeftSideMenu navigation={navigation} />
                    {user && isSuccess && <RightSideMenu />}
                </div>
            </div>
            <MobileDisclosurePanel navigation={navigation} />
        </Disclosure>
    );
};

export default NavbarContainer;
