import HomePage from '@Index/HomePage';
import type { NextPage } from 'next';
import { ReactNode } from 'react';
  
const page : NextPage = async () :Promise<ReactNode> => {
    return <HomePage />
}

export default page