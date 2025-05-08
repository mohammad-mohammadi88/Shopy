import FormsLayout from "@Auth/FormsLayout";
import type { ReactNode } from "react";

const layout = async ({
    children,
}: Readonly<{
    children: ReactNode;
}>) => <FormsLayout title='Sign up to Shopy'>{children}</FormsLayout>;

export default layout;
