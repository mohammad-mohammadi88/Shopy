import { cookies } from "next/headers"

export async function DELETE(){
    const cookie = await cookies()
    try{
        cookie.delete('shopy_user_token') 
        return new Response('the cookie set successfully!',{
            status:200,
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