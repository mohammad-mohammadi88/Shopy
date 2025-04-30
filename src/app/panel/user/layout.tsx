"use client";

import type { FC, ReactNode } from "react";
import { redirect } from "next/navigation";
import UserPanel from "@Panel/user/User";
import useAuth from "@Hooks/useAuth";

interface Props {
    children: ReactNode;
}
const layout: FC<Readonly<Props>> = ({ children }) => {
    const {user} = useAuth()
    if(user.isAdmin) redirect('/panel/admin')
    return <UserPanel>{children}</UserPanel>;
};

export default layout;
