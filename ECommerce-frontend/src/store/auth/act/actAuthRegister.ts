import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { axiosErrorHandler } from "@utils";

type TFormData =  {
    firstName:string;
    lastName:string;
    email:string;
    password:string;
}

const actAuthRegister = createAsyncThunk("auth/actAuthRegister", async(formData:TFormData,thankAPI)=>{
    const {rejectWithValue}=thankAPI;

    try {
        const response = await axios.post("/register",formData);

        return response.data;
    } catch (error) {
        return rejectWithValue(axiosErrorHandler(error))
    }

})


export default actAuthRegister;