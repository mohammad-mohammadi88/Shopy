import axios from "axios"

export const storeUserToken = async (token:string,maxDay:number = 10) :Promise<void> => {
    await fetch('/api/login',{
        method:'POST',
        headers:{
            'Content-type' : "application/json"
        },
        body:JSON.stringify({ token, maxDay }),
    })
}

export const removeUserToken = async () : Promise<void> => {
    await fetch('/api/logout',{
        method:'DELETE',
        headers:{
            'Content-type' : "application/json"
        }
    })
}