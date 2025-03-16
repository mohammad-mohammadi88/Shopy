"use client";

import UserInfo from "@Panel/admin/UserAndProductInfo";
import UsersPagination from "@Panel/admin/Pagination";
import UsersListHeader from "@Panel/admin/Header";
import UsersListBody from "@Panel/admin/Body";
import UsersTHead from "@Panel/admin/THead";
import { useEffect, useState } from "react";
import { NextPage } from "next";
import { useDeleteUser, useReadUser } from "@Helpers/userApi";
import { showAuthToast } from "@Contracts/toast";
import { queryClient } from "@App/layout";
import { UserFormInterFace } from "@Interfaces/forms";

const page: NextPage = () => {
    const [ page, setPage ] = useState<number>(1);
    const { data, isSuccess, refetch, isLoading, isError } = useReadUser(page);
    const { mutate,isSuccess:isDeleted,error } = useDeleteUser()
    const handleDelete = (id:string) => {
        mutate(id)
        queryClient.invalidateQueries({queryKey:['users']})
        showAuthToast(false,'This Product deleted successfully!', isDeleted ? 200 : 500,200,error)
    }
    useEffect(()=>{
        refetch()
    },[isDeleted])
    return (
        <>
            <div className='px-4 sm:px-6 lg:px-8'>
                <UsersListHeader
                    href='/panel/admin/users/addUser'
                    buttonTitle='Add User'
                    paragraph='You can see users list in this page.'
                />
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
                                info="Phone"
                                title='UserName'
                                about='Is Admin'
                            />
                            <tbody className='divide-y divide-gray-200 bg-white'>
                            {data?.data?.map(({ name, isAdmin , phone, id }:UserFormInterFace) => (
                                    <UserInfo
                                        key={id}
                                        updateHref={`/panel/admin/users/update/${id}`}
                                        name={name}
                                        id={id}
                                        handleDelete={()=>handleDelete(id)}
                                        info={phone}
                                        about={Boolean(isAdmin)}
                                    />
                                ))}
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
        </>
    );
};

export default page;
