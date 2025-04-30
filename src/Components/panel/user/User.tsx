"use client";

import MobileSidebar, { type navigationInterface } from "../MobileSidebar";
import Navbar, { type userNavigationInterface } from "../Navbar";
import { type FC, type ReactNode, useState } from "react";
import { HomeIcon } from "@heroicons/react/24/outline";
import DesktopSidebar from "../DesktopSidebar";
import useAuth from "@Hooks/useAuth";

const navigation: navigationInterface[] = [
    { name: "Dashboard", href: "/panel/user", icon: HomeIcon },
];

interface Props{ children: ReactNode }

const UserPanel:FC<Props> = ({ children }) => {
    const {
        user: { id },
    } = useAuth();
    const userNavigation: userNavigationInterface[] = [
        { name: "Home Page", href: "/" },
        { name: "Your Profile", href: "/panel/user" },
        { name: "Edit Profile", href: `/panel/user/update/${id}` },
    ];
    const [sidebarOpen, setSidebarOpen] = useState(false);
    return (
        <div>
            <MobileSidebar
                setSidebarOpen={setSidebarOpen}
                navigation={navigation}
                sidebarOpen={sidebarOpen}
            />

            <DesktopSidebar navigation={navigation} />

            <div className='flex flex-col md:pl-64'>
                <Navbar
                    userNavigation={userNavigation}
                    setSidebarOpen={setSidebarOpen}
                />
                {children}
            </div>
        </div>
    );
};

export default UserPanel;
