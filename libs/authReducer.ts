import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "./store";

export interface AuthInitialStateInterface{
    userToken?: string,
    userName?:string,
    phoneVerifyToken?:string
};

const initialState: AuthInitialStateInterface = {
    userToken: undefined,
    userName: undefined,
    phoneVerifyToken: undefined
}
interface addTokenInterface{
    token:string,
    userName:string,
}
const authSlice = createSlice({
    name:"auth",
    initialState,
    reducers:{
        addPhoneVerifyToken: (state,action:PayloadAction<string>)=>{
            state.phoneVerifyToken = action.payload
        },
        addUserToken:(state,action:PayloadAction<addTokenInterface>)=>{
            const { token, userName } = action.payload
            state.userToken = token
            state.userName = userName
        }
    }
})

export const {
    addUserToken,
    addPhoneVerifyToken
} = authSlice.actions;
export default authSlice.reducer;

export const authSelector = (state:RootState)=>state.authentication