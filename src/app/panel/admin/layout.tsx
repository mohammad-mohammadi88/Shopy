"use client";

import { redirect } from "next/navigation";
import type { FC, ReactNode } from "react";
import AdminPanel from "@Panel/admin";
import useAuth from "@Hooks/useAuth";

interface Props {
    children: ReactNode;
}
const layout: FC<Readonly<Props>> = ({ children }) => {
    const {user} = useAuth()
    if(!user.isAdmin) redirect('/panel/user')
    return <AdminPanel>{children}</AdminPanel>;
};

export default layout;
