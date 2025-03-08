import { NextApiRequest, NextApiResponse } from "next";
import cookie from "cookie"

interface ExtendedNextRequest extends NextApiRequest{
    body:{
        token:string
    }
}
export default function handler(
    req:ExtendedNextRequest,
    res:NextApiResponse<string>
){
    if(req.method === "POST"){
        try{
            res.setHeader(
                'Set-Cookie',
                cookie.serialize('shopy-user-token',req?.body?.token,{
                    httpOnly: true,
                    path: '/',
                    maxAge: 10 * 24 * 3600,
                    sameSite : "lax"
                })
            )
            res.status(201).send('the cookie set successfully!')
        } catch(err) {
            res.status(500).send('Something went wrong while setting cookie')
        }
    } else {
        res.status(400).send('the method is unavailable')
    }
}
