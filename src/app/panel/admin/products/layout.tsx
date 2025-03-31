import Dashboard from '@Panel/Dashboard';
import type { FC, ReactNode } from 'react';

interface Props{
    children:ReactNode
}
const layout:FC<Readonly<Props>> = async ({ children }) => <Dashboard header='Products List'>{children}</Dashboard>

export default layout