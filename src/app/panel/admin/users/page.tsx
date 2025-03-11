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
        title: "Front-end Developer",
        phone: "01548725412",
        role: "Member",
    },
    {
        id: "2",
        name: "Mohammad dev",
        title: "Full-stack Developer",
        phone: "09146360528",
        role: "Member",
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
                            about='About'
                        />
                        <tbody className='divide-y divide-gray-200 bg-white'>
                            {people.map(({ name, title, phone, id }) => (
                                <UserInfo
                                    key={id}
                                    // email={email}
                                    name={name}
                                    // id={id}
                                    info={phone}
                                    about={title}
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
