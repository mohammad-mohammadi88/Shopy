import Cookies from "universal-cookie"

export const storeLoginToken = (token:string,maxDay:number = 10) :void => {
    const cookies = new Cookies(null,{
        path: '/',
        maxAge: maxDay * 24 * 3600
    })
    cookies.set('shopy-user-token',token,)
}

export const getLoginToken = () :string => {
    const cookies = new Cookies()
    return cookies.get('shopy-user-token')
}

export const removeLoginToken = () :void => {
    const cookies = new Cookies()
    cookies.remove('shopy-user-token')
}