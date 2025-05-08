"use client";

import { FolderIcon, HomeIcon, UsersIcon } from "@heroicons/react/24/outline";
import MobileSidebar, { type navigationInterface } from "../MobileSidebar";
import Navbar, { type userNavigationInterface } from "../Navbar";
import DesktopSidebar from "../DesktopSidebar";
import useAuth from "@Hooks/useAuth";
import {
    type ReactNode,
    useState,
} from "react";

const navigation: navigationInterface[] = [
    { name: "Dashboard", href: "/panel/admin", icon: HomeIcon },
    { name: "Users", href: "/panel/admin/users", icon: UsersIcon },
    { name: "Products", href: "/panel/admin/products", icon: FolderIcon },
];


const AdminPanel = ({ children }: { children: ReactNode }) => {
    const { user:{id} } = useAuth()
    const userNavigation: userNavigationInterface[] = [
        { name: "Home Page", href: "/" },
        { name: "Your Profile", href: "/panel/admin" },
        { name: "Edit Profile", href: `/panel/admin/users/update/${id}` },
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

export default AdminPanel;
