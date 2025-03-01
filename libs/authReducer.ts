import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface initialStateInterfa{
    token:string,
    email:string,
    userName:string
};

const initialState: initialStateInterfa = {
    token:'',
    userName:'',
    email:''
}
interface addTokenInterface{
    token:string,
    userName:string,
    email:string
}
const authSlice = createSlice({
    name:"auth",
    initialState,
    reducers:{
        addToken:(state,action:PayloadAction<addTokenInterface>)=>{
            state.token = action.payload.token
            state.userName = action.payload.userName
            state.email = action.payload.email
        }
    }
})

export const {
    addToken
} = authSlice.actions;
export default authSlice.reducer;