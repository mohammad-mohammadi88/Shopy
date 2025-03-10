"use client";

import UserInfo from "@Panel/admin/UserAndProductInfo";
import UsersPagination from "@Panel/admin/Pagination";
import UsersListHeader from "@Panel/admin/Header";
import UsersTHead from "@/Components/panel/admin/THead";
import UsersListBody from "@Panel/admin/Body";
import { lazy, Suspense, useState } from "react";
import { NextPage } from "next";

const people = [
    {
        id: "1",
        name: "Lindsay Waltonjjjjjjjjjjjjjjjjjhh",
        title: "Front-end Developer",
        email: "lindsay.walton@example.com",
        role: "Member",
    },
    {
        id: "2",
        name: "Mohammad dev",
        title: "Full-stack Developer",
        email: "mohammaddev09@gmail.com",
        role: "Member",
    },
];

const page: NextPage = () => {
    const [showAddProduct, setShowAddProduct] = useState(false);
    const AddProductModal = lazy(()=>import("@Panel/admin/Producs/AddProductModal"))
    return (
        <>  
            <Suspense>
                <AddProductModal
                    showAddProduct={showAddProduct}
                    setShowAddProduct={setShowAddProduct}
                />
            </Suspense>
            <div className='px-4 sm:px-6 lg:px-8'>
                <UsersListHeader
                    setShowModal={setShowAddProduct}
                    buttonTitle='Add User'
                    paragraph='You can see users list in this page.'
                />
                <UsersListBody>
                    <table className='min-w-full divide-y divide-gray-300'>
                        <UsersTHead title="UserName" discription="discription"/>
                        <tbody className='divide-y divide-gray-200 bg-white'>
                            {people.map(
                                ({ name, title, id }) => (
                                    <UserInfo
                                        key={id}
                                        // email={email}
                                        name={name}
                                        // id={id}
                                        title={title}
                                    />
                                )
                            )}
                        </tbody>
                    </table>
                    <UsersPagination />
                </UsersListBody>
            </div>
        </>
    );
};

export default page;
