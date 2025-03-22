'use client';
import MobileDisclosureButton from "./MobileDisclosureButton";
import MobileDisclosurePanel from "./MobileDisclosurePanel";
import DesktopLeftSideMenu from "./DesktopLeftSideMenu";
import { Disclosure } from "@headlessui/react";
import RightSideMenu from "./RightSideMenu";
import useAuth from "@Hooks/useAuth";
import { FC, useEffect, useState } from "react";

export interface NavigationInterface {
    name: string;
    href: string;
}
interface Props{
    notLoginNavigation:NavigationInterface[],
    loginNavigation:NavigationInterface[]
}
const NavbarContainer: FC<Props> = ({notLoginNavigation,loginNavigation}) => {
    const { user, isSuccess, refetch } = useAuth();
    const [navigation, setNavigation] = useState(notLoginNavigation)
    useEffect(()=>{
        if(user) setNavigation(loginNavigation)
    },[user])
    useEffect(()=>{
        refetch()
    },[])
    return (
        <Disclosure as='nav' className='shadow-2xl'>
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
