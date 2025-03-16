"use client";

import useAuth from "@/hooks/useAuth";
import { redirect } from "next/navigation";
import { FC, ReactNode} from "react";

interface Props {
    children: ReactNode;
}
const layout: FC<Readonly<Props>> = ({ children }) => {
    const {user} = useAuth()
    if(user.isAdmin) redirect('/panel/admin')
    return <>{children}</>;
};

export default layout;
