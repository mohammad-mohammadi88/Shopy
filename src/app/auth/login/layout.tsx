import FormsLayout from "@Auth/FormsLayout";
import React from 'react';

const layout = ({
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