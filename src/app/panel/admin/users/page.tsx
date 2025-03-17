"use client";

import { useDeleteUser, useReadUser } from "@Helpers/userApi";
import UserInfo from "@/Components/panel/UserAndProductInfo";
import UsersPagination from "@/Components/panel/Pagination";
import { UserFormInterFace } from "@Interfaces/forms";
import UsersListHeader from "@/Components/panel/Header";
import { showAuthToast } from "@Contracts/toast";
import UsersListBody from "@/Components/panel/Body";
import UsersTHead from "@/Components/panel/THead";
import { useEffect, useState } from "react";
import { queryClient } from "@App/layout";
import { NextPage } from "next";
import Link from "next/link";

const page: NextPage = () => {
    const [page, setPage] = useState<number>(1);
    const { data, isSuccess, refetch, isLoading, isError } = useReadUser(page);
    const { mutate, isSuccess: isDeleted, error } = useDeleteUser();
    const handleDelete = (id: string) => {
        mutate(id);
        queryClient.invalidateQueries({ queryKey: ["users"] });
        showAuthToast(
            false,
            "This Product deleted successfully!",
            isDeleted ? 200 : 500,
            200,
            error
        );
    };
    useEffect(() => {
        refetch();
    }, [isDeleted]);
    return (
        <div className='px-4 sm:px-6 lg:px-8'>
            <UsersListHeader paragraph='You can see users list in this page.'>
                <div className='mt-4 sm:mt-0 sm:ml-16 md:ml-0 sm:flex-none'>
                    <Link href='/panel/admin/users/add'>
                        <button
                            type='button'
                            className='inline-flex items-center justify-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 sm:w-auto'
                        >
                            Add User
                        </button>
                    </Link>
                </div>
            </UsersListHeader>
            {isLoading && (
                <div className='mt-6 text-3xl font-bold text-center'>
                    Loading users...
                </div>
            )}
            {data?.total_page < 1 && (
                <div className='mt-6 text-3xl font-bold text-center'>
                    There is no user on the database!
                </div>
            )}
            {isError && (
                <div className='mt-6 text-3xl font-bold text-center'>
                    Ops! We have Error
                </div>
            )}
            {isSuccess && data && data?.total_page > 0 && (
                <UsersListBody>
                    <table className='min-w-full divide-y divide-gray-300'>
                        <UsersTHead
                            info='Phone'
                            title='UserName'
                            about='Is Admin'
                        />
                        <tbody className='divide-y divide-gray-200 bg-white'>
                            {data?.data?.map(
                                ({
                                    name,
                                    isAdmin,
                                    phone,
                                    id,
                                }: UserFormInterFace) => (
                                    <UserInfo
                                        key={id}
                                        updateHref={`/panel/admin/users/update/${id}`}
                                        name={name}
                                        id={id}
                                        canDelete={true}
                                        canEdit={true}
                                        handleDelete={() => handleDelete(id)}
                                        info={phone}
                                        about={Boolean(isAdmin)}
                                    />
                                )
                            )}
                        </tbody>
                    </table>
                    <UsersPagination
                        page={page}
                        setPage={setPage}
                        totalPages={data?.total_page}
                    />
                </UsersListBody>
            )}
        </div>
    );
};

export default page;
