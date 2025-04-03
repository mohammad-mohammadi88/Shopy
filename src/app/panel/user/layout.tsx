"use client";

import { redirect } from "next/navigation";
import useAuth from "@Hooks/useAuth";
import { FC, ReactNode} from "react";
import UserPanel from "@Panel/user/User";

interface Props {
    children: ReactNode;
}
const layout: FC<Readonly<Props>> = ({ children }) => {
    const {user} = useAuth()
    if(user.isAdmin) redirect('/panel/admin')
    return <UserPanel>{children}</UserPanel>;
};

export default layout;
