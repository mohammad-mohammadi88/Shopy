"use client";

import UserInfo from "@Panel/admin/UserAndProductInfo";
import UsersPagination from "@Panel/admin/Pagination";
import UsersListHeader from "@Panel/admin/Header";
import UsersListBody from "@Panel/admin/Body";
import UsersTHead from "@Panel/admin/THead";
import { NextPage } from "next";

const people = [
    {
        id: "1",
        name: "Lindsay Walton",
        phone: "01548725412",
        isAdmin: false,
    },
    {
        id: "2",
        name: "Mohammad dev",
        phone: "09146360528",
        isAdmin: true,
    },
];

const page: NextPage = () => {
    return (
        <>
            <div className='px-4 sm:px-6 lg:px-8'>
                <UsersListHeader
                    href='/panel/admin/users/addUser'
                    buttonTitle='Add User'
                    paragraph='You can see users list in this page.'
                />
                <UsersListBody>
                    <table className='min-w-full divide-y divide-gray-300'>
                        <UsersTHead
                            info="Phone"
                            title='UserName'
                            about='Is Admin'
                        />
                        <tbody className='divide-y divide-gray-200 bg-white'>
                            {people.map(({ name,isAdmin , phone, id }) => (
                                <UserInfo
                                    key={id}
                                    name={name}
                                    // id={id}
                                    info={phone}
                                    about={isAdmin}
                                />
                            ))}
                        </tbody>
                    </table>
                    <UsersPagination />
                </UsersListBody>
            </div>
        </>
    );
};

export default page;
