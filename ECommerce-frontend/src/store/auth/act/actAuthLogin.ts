import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { axiosErrorHandler } from "@utils";

type TFormData =  {
    email:string;
    password:string;
}
type TResponse = {
    accessToken:string;
    user:{
        id:number;
        firstName:string;
        lastNmame:string;
        email:string;
    }
}
const actAuthLogin = createAsyncThunk("auth/actAuthLogin", async(formData:TFormData,thankAPI)=>{
    const {rejectWithValue}=thankAPI;
    try {
        const response = await axios.post<TResponse>("/login",formData);

        return response.data;

    } catch (error) {
        return rejectWithValue(axiosErrorHandler(error));
    }
});


export default actAuthLogin;