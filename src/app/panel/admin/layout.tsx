"use client";

import { redirect } from "next/navigation";
import AdminPanel from "@Panel/admin";
import { FC, ReactNode } from "react";
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
