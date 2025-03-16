import type { NextPage } from 'next';
import Link from 'next/link';

const page :NextPage = async () => {
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