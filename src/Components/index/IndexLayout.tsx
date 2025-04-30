'use client'

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import type { FC, ReactNode } from 'react';

interface Props {
  children: ReactNode;
}
export const queryClient =  new QueryClient()
const IndexLayout: FC<Props> = ({ children }) => <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>

export default IndexLayout;
