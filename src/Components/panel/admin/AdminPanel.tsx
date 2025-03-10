"use client";

import { FolderIcon, HomeIcon, UsersIcon } from "@heroicons/react/24/outline";
import DesktopSidebar from "../DesktopSidebar";
import MobileSidebar from "../MobileSidebar";
import Navbar from "../Navbar";
import {
    ForwardRefExoticComponent,
    RefAttributes,
    SVGProps,
    ReactNode,
    useState,
} from "react";

export interface navigationInterface {
    name: string;
    href: string;
    icon: ForwardRefExoticComponent<
        Omit<SVGProps<SVGSVGElement>, "ref"> & {
            title?: string;
            titleId?: string;
        } & RefAttributes<SVGSVGElement>
    >;
}

export interface userNavigationInterface {
    name: string;
    href: string;
}

const navigation: navigationInterface[] = [
    { name: "Dashboard", href: "/panel/admin", icon: HomeIcon },
    { name: "Users", href: "/panel/admin/users", icon: UsersIcon },
    { name: "Products", href: "/panel/admin/products", icon: FolderIcon },
];

const userNavigation: userNavigationInterface[] = [
    { name: "Your Profile", href: "/panel/admin" },
    { name: "Settings", href: "#" },
];

const adminPanel = ({ children }: { children: ReactNode }) => {
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

export default adminPanel;
