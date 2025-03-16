import type { InitialAuthStateInterface } from "./authentication";

interface Action{
    type:string,
    payload:any
}

export enum AuthActions{
    addPhoneToken = "auth/addPhoneToken"
}
export default function AuthReducer(state:InitialAuthStateInterface,action:Action){
    switch (action.type) {
        case AuthActions.addPhoneToken:
            const { payload:phoneVerifyToken } =action
            return { phoneVerifyToken }
        default:
            return state
    }
}