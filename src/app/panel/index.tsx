'use client';

import { getLoginToken } from '@Helpers/loginToken'
import { NextPage } from 'next'
import Router from 'next/router'
import React, { ReactNode, useLayoutEffect } from 'react'

const index:NextPage = () :ReactNode => {
    const userToken:string = getLoginToken()

    useLayoutEffect(()=>{
        if(userToken?.length>0){
            console.log('hello')
        } else {
            Router.push('auth/login')
        }
    },[])
    return (
        <div>index</div>
    )
}

export default index
