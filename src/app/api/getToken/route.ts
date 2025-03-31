import { cookies } from "next/headers"
import { NextResponse } from "next/server"

export async function GET(){
    try{
        const token = (await cookies()).get('shopy_user_token')
        if(token){
            return new NextResponse(token.value,{
                status:200
            })
        }
        return new Response('token is undefined',{
            status:404
        })
    } catch(e) {
        console.log(e)
        return new Response('Something went wrong while getting cookie',{
            status:500,
            statusText:'Something went wrong while getting cookie',
        })
    }
}