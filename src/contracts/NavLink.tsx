"use client";

import { usePathname } from "next/navigation";
import type { FC, ReactNode } from "react";
import Link from "next/link";

interface Props {
    href: string;
    children: ReactNode;
    className: string;
    [key: string]: any;
}
const NavLink: FC<Props> = ({ href, children, className, ...props }) => (
    <Link
        className={`${href === usePathname() ? "active " : ""}${className}`}
        href={href}
        {...props}
    >
        {children}
    </Link>
);

export default NavLink;
