import { NextApiRequest, NextApiResponse } from "next";
import { serialize } from "cookie"

interface ExtendedNextRequest extends NextApiRequest{
    body:{
        token:string,
        maxDay:number
    }
}
export default function handler(
    req:ExtendedNextRequest,
    res:NextApiResponse<string>
){
    if(req.method === "POST"){
        const maxAge = req?.body?.maxDay || 10
        console.log(req.body)
        try{
            res.setHeader(
                'Set-Cookie',
                serialize('shopy_user_token',req?.body?.token,{
                    httpOnly: true,
                    path: '/',
                    maxAge: maxAge * 24 * 3600,
                    sameSite : "lax"
                }),
            )
            res.status(201).send('the cookie set successfully!')
        } catch(err) {
            console.log('err',err)
            res.status(500).send('Something went wrong while setting cookie')
        }
    } else {
        res.status(400).send('the method is unavailable')
    }
}
