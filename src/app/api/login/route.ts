import { cookies } from "next/headers"

export async function POST(req:Request){
    const {maxDay=10,token} = await req.json()
    const cookie = await cookies()
    try{
        cookie.set('shopy_user_token', token ,{
            httpOnly: true,
            path: '/',
            maxAge: maxDay * 24 * 3600,
            sameSite:"lax"
        })
        return new Response('the cookie set successfully!',{
            status:201,
            statusText:"",
        })
    } catch(e) {
        console.log(e)
        return new Response('Something went wrong while setting cookie',{
            status:500,
            statusText:'Something went wrong while setting cookie',
        })
    }
}