import { serialize } from "cookie"

export async function DELETE(){
    try{
        return new Response('the cookie set successfully!',{
            status:200,
            headers:{
                'Set-Cookie': serialize('shopy_user_token', '' ,{
                    httpOnly: true,
                    path: '/',
                    maxAge: 0,
                    sameSite:"lax"
                })
            },
            statusText:"",
        })
    } catch(e) {
        console.log(e)
        return new Response('Something went wrong while deleting cookie',{
            status:500,
            statusText:'Something went wrong while deleting cookie',
        })
    }
}