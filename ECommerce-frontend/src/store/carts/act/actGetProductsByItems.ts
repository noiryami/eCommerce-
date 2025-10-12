import type { RootState } from "@store/index";
import { createAsyncThunk } from "@reduxjs/toolkit";    
import axios  from "axios";
import { axiosErrorHandler } from '@utils'
import type { TProduct } from "@types";


type TResponse=TProduct[];
const actGetProductsByItems =createAsyncThunk("cart/actGetProductsByItems",
    async (_,thankAPI)=>{
        const {rejectWithValue,fulfillWithValue,getState,signal}=thankAPI;
        const {cart}= getState()as RootState;
        const itemsId= Object.keys(cart.items);
        if(!itemsId.length){
            return fulfillWithValue([]);
        }
        try {
        const linkedItemsId= itemsId.map((el) =>`id=${el}`).join("&");
        const response =await axios.get<TResponse>(`/products?${linkedItemsId}`,{signal});
        return response.data;      
        } catch (error) {
            return rejectWithValue(axiosErrorHandler(error))
            
        }
    });


export default actGetProductsByItems;
