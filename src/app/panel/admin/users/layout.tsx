import type { FC, ReactNode } from 'react';
import Dashboard from '@Panel/Dashboard';

interface Props{
    children:ReactNode
}
const layout:FC<Readonly<Props>> = async ({ children }) => <Dashboard header='Users List'>{children}</Dashboard>

export default layout