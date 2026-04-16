
import { createAsyncThunk, createSlice,PayloadAction } from "@reduxjs/toolkit"
import axios from "axios";
import * as SecureStore from "expo-secure-store";


interface authProvider{
 name:string | null,   
 email:string | null,   
 password:string | null,
 answer:string | null
}

interface auth{
    user:authProvider[],
    error:null,
    loading:boolean
}

const initialState:auth={
user:[],
error:null,
loading:false
}

export const register=createAsyncThunk<auth>(
 "auth/register" ,
 async(form,{rejectWithValue})=>{
try {
   const response=await axios.post(`${process.env.EXPO_PUBLIC_BLOG_API}/api/v1/auth/register`,form)
 return response  
} catch (error) {
    return rejectWithValue(error)
}
 }  
)
const authSlice=createSlice({
name:"auth",
initialState,
reducers:{
if(action.payload){
 async()=>{
    await SecureStore.getItemAsync("token")
 }else{
    await SecureStore.deleteItemAsync("token")
 }
}
},
extraReducers:(builder)=>{
builder.
addCase(register.pending,(state)=>{
 state.loading=true,
 state.error=null   
})
}
.addCase(register.fulfilled,(state,action)=>{
    state.user=action.payload,
    state.error=null
})
.addCase(register.rejected,(state)=>{
    state.loading=false,
    state.error=err.message
})
})

export default authSlice.reducer