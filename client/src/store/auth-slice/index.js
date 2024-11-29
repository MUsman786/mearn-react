import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
const initialState= {
    isAuthenticated:false,
    isLoading:false,
    user:null
}

export const registerUser = createAsyncThunk('/auth/register',async (formData, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        'http://localhost:8000/api/auth/register',
        formData,
      );
      return response.data;
    } catch (error) {
      // Use rejectWithValue to return custom error message
      return rejectWithValue(error.response?.data || "Registration failed");
    }
//   }
    // console.log(response.data)
    // return response.data;
})
export const loginUser = createAsyncThunk('/auth/login',async (formData, { rejectWithValue }) =>{
    try {
        const response =await axios.post( 'http://localhost:8000/api/auth/login',formData,{withCredentials: true})
       return response.data
    } catch (error) {
        return rejectWithValue(error.response?.data || "Login failed")
    }
})
const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setUser:(state,action)=>{}
    },
    extraReducers:(builder)=>{
        builder.addCase(registerUser.pending,state=>{
            state.isLoading=true
        }).addCase(registerUser.fulfilled,(state, action)=>{
            state.isLoading=false,
            state.isAuthenticated =false,
            state.user= null
        }).addCase(registerUser.rejected,(state)=>{
            state.isLoading=false,
            state.user=null,
            state.isAuthenticated=false
        }).addCase(loginUser.pending,state=>{
            state.isLoading=true
        }).addCase(loginUser.fulfilled,(state, action)=>{
            state.isLoading=false,
            state.isAuthenticated =!action.payload?.success?false:true,
            state.user= !action.payload?.success?null:action.payload.user
        }).addCase(loginUser.rejected,(state)=>{
            state.isLoading=false,
            state.user=null,
            state.isAuthenticated=false
        })
    }
})
export const {setUser}=authSlice.actions
export default authSlice.reducer;