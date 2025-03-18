import Dashboard from '@Panel/Dashboard';
import type { NextPage } from 'next';

const page:NextPage = async () => {
    return (
        <Dashboard header='Dashboard'>
            <div className='mt-6 text-3xl font-bold text-center'>
                You did not buy any course.
            </div>
        </Dashboard>
    )
}

export default page