import { QueryClient,dehydrate } from '@tanstack/react-query';
import { getUser } from '@Hooks/useAuth';
import type { NextPage } from 'next';
import Link from 'next/link';
import axios from "axios"

axios.defaults.baseURL = process.env.NEXT_PUBLIC_SERVER_URL;
axios.defaults.withCredentials = true;

export async function generateMetadata() {
    const queryClient = new QueryClient();
    const queryKey = ['user_info'];
    const queryFn = () => getUser()
    await queryClient.prefetchQuery({
        queryKey,
        queryFn,
    })
  
    return {
        props: {
            dehydratedState: dehydrate(queryClient),
        },
    };
}
  
const page : NextPage = () => {
    return (
        <>
            index page<br />
            <Link href="/auth/login">login</Link><br />
            <Link href="/auth/login-verify">verify</Link><br />
            <Link href="/auth/register">register</Link><br />
            <Link href="/panel/admin">admin</Link><br />
        </>
    )
}

export default page