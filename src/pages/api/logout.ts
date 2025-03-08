import { NextApiRequest, NextApiResponse } from "next";
import cookie from "cookie";

export default function handler(req:NextApiRequest,res:NextApiResponse){
    if(req.method === "DELETE"){
        try{
            res.setHeader(
                'Set-Cookie',
                cookie.serialize('shopy-user-token',"",{
                    httpOnly: true,
                    path: '/',
                    maxAge: 0,
                    sameSite : "lax"
                })
            )
            res.status(201).send('The cookie set successfully!')
        } catch(err) {
            res.status(500).send('Something went wrong while deleting cookie')
        }
    } else {
        res.status(400).send('This method is unavailable')
    }
}