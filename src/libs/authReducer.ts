import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "./store";

export interface AuthInitialStateInterface{
    userName?:string,
    phoneVerifyToken?:string
};

const initialState: AuthInitialStateInterface = {
    userName: undefined,
    phoneVerifyToken: undefined
}

const authSlice = createSlice({
    name:"auth",
    initialState,
    reducers:{
        addPhoneVerifyToken: (state,action:PayloadAction<string>) :void =>{
            state.phoneVerifyToken = action.payload
        },
        addUserName:(state,action:PayloadAction<string>) :void =>{
            state.userName = action.payload
            state.phoneVerifyToken = ''
        }
    }
})

export const {
    addUserName,
    addPhoneVerifyToken
} = authSlice.actions;
export default authSlice.reducer;

export const authSelector = (state:RootState)=>state.authentication