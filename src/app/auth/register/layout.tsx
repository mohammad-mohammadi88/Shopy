import FormsLayout from "@Auth/FormsLayout"
import { ReactNode } from "react"

const layout = ({
    children,
}: Readonly<{
    children: ReactNode;
}>) => {
    return (
        <FormsLayout title="Sign up to Shopy">
            {children}
        </FormsLayout>
    )
}

export default layout