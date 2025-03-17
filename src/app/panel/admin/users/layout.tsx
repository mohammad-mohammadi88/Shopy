import Dashboard from '@Panel/Dashboard';
import { FC, ReactNode } from 'react';

interface Props{
    children:ReactNode
}
const layout:FC<Readonly<Props>> = ({ children }) => {
    return <Dashboard header='Users List'>{children}</Dashboard>
}

export default layout