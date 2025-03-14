'use client';

import { usePathname } from "next/navigation";
import { FC, ReactNode } from "react";
import Link from "next/link";

interface Props {
    href: string;
    children: ReactNode | string;
    className: string;
    [key: string]: any;
}
const NavLink: FC<Props> = ({ href, children, className, ...props }) => {
    const pathname = usePathname();
    return (
        <Link
            className={`${href === pathname && "active"} ${className}`}
            href={href}
            {...props}
        >
            {children}
        </Link>
    );
};

export default NavLink;
