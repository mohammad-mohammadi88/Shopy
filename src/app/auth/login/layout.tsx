import FormsLayout from "@Auth/FormsLayout";
import React from 'react';

const layout = async ({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) => {
    return (
        <FormsLayout title='Login to Shopy'>
            {children}
        </FormsLayout>
    )
}

export default layout