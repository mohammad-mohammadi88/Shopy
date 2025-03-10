"use server";

import { FC, ReactNode} from "react";
import AdminPanel from "@Panel/admin";

interface Props {
    children: ReactNode;
}
const layout: FC<Readonly<Props>> = ({ children }) => {
    return <AdminPanel>{children}</AdminPanel>;
};

export default layout;
