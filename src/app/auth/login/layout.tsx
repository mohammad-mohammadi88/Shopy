import FormsLayout from "@Auth/FormsLayout";
import type { ReactNode } from 'react';

const layout = async ({
    children,
}: Readonly<{
    children: ReactNode;
}>) => {
    return (
        <FormsLayout title='Login to Shopy'>
            {children}
        </FormsLayout>
    )
}

export default layout