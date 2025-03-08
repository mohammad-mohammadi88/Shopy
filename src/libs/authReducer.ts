import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "./store";

export interface AuthInitialStateInterface{
    phoneVerifyToken?:string
};

const initialState: AuthInitialStateInterface = {
    phoneVerifyToken: undefined
}

const authSlice = createSlice({
    name:"auth",
    initialState,
    reducers:{
        addPhoneVerifyToken: (state,action:PayloadAction<string>) :void =>{
            state.phoneVerifyToken = action.payload
        }
    }
})

export const {
    addPhoneVerifyToken
} = authSlice.actions;
export default authSlice.reducer;

export const authSelector = (state:RootState)=>state.authentication