
import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { axiosErrorHandler } from "@utils";
import type { TProduct } from "@types";
import type { RootState } from "@store/index";

type TDataType = "ProductFullInfo"|"ProductIds";
type TResponse = TProduct[];


const actGetWishlist = createAsyncThunk("wishlist/actGetWishlist",async(dataType:TDataType,thunkAPI)=>{
    const {rejectWithValue,signal,getState}=thunkAPI;
    const {auth}= getState() as RootState;
    try {
        const userWishlist = await axios.get<{productId:number}[]>(`/wishlist?userId=${auth.user?.id}`,{signal})

        if(!userWishlist.data.length){return {data:[],dataType:"empty"};
      };
        if(dataType ==="ProductIds"){
        const linkedItemsId =userWishlist.data.map((el)=> el.productId);
        return  {data:linkedItemsId,dataType:"ProductIds"};
        }else{
        const linkedItemsId =userWishlist.data.map((el)=>`id=${el.productId}`).join("&");

        const response = await axios.get<TResponse>(`/products?${linkedItemsId}`);
      return {data:response.data,dataType:"ProductFullInfo"};
        }
    } catch (error) {
         return rejectWithValue(axiosErrorHandler(error))   
    }

});

export default actGetWishlist;