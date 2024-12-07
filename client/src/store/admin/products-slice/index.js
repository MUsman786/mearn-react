import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';


const initialState={
  isLoading:false,
  ProductList:[]
}

export const addNewProduct =createAsyncThunk(
  '/products/addNewProduct',
  async (formData)=>{
    const response = await axios.post('http://localhost:8000/api/admin/products/add', formData,{ headers: {
        'Content-Type': 'application/json'
      }})
    return response?.data
  }
)

export const fetchAllProducts =createAsyncThunk(
  '/products/fetchAllProducts',
  async ()=>{
    const response = await axios.get('http://localhost:8000/api/admin/products/all')
    return response?.data
  }
)
export const editProduct =createAsyncThunk(
  '/products/editProduct',
  async ({id,formData})=>{
    console.log(formData)
    const response = await axios.put(`http://localhost:8000/api/admin/products/edit/${id}`,
      formData,
      { headers: {
        'Content-Type': 'application/json'
      }}
    )
    return response?.data
  }
)
export const deleteProduct =createAsyncThunk(
  '/products/deleteProduct',
  async (id)=>{
    const response = await axios.delete(`http://localhost:8000/api/admin/products/delete/${id}`,
    )
    return response?.data
  }
)
const AdminProductSlice =createSlice({
  name:'adminProductSlice',
  initialState,
  reducer:{},
  extraReducers: (builder) => {
    builder.addCase(fetchAllProducts.pending,(state)=>{
      state.isLoading=true
    }).addCase(fetchAllProducts.fulfilled,(state,action)=>{
  state.isLoading=false,
  state.ProductList=action.payload.data
}).addCase(fetchAllProducts.rejected,(state)=>{
  state.isLoading=false,
  state.ProductList=[]
})
}
})
export default AdminProductSlice.reducer
