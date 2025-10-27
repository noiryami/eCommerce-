import { useEffect } from "react";
import { useAppDispatch,useAppSelector } from "@store/hooks";
import { actAuthRegister, resetUI } from "@store/auth/authSlice";
import { useNavigate } from "react-router-dom";

import { useForm,type SubmitHandler, } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { singUpSchema, type singUpType } from "@validations/singUpSchema";
import useCheckEmailAvailability from "@hooks/useCheckEmailAvailability";

const useRegister = () => {
    
  const navgate = useNavigate();
  const dispatch =useAppDispatch();
  const {loading,error,accessToken}= useAppSelector((state)=>state.auth);



const {register,handleSubmit,trigger,getFieldState,formState:{errors:formErrors}}= useForm<singUpType>({
  mode:"onBlur",
  resolver: zodResolver(singUpSchema),}
);  
  const {emailAvailabilityStatus,enteredEmail,checkEmailAvailability,restCheckEmailAvailability}=useCheckEmailAvailability();

  
  const submitFrom:SubmitHandler<singUpType> = async(data)=> {
    const {firstName,lastName,email,password}= data;
       
    dispatch(actAuthRegister({firstName,lastName,email,password})).unwrap().then(()=>{
      navgate("/login?message=account_created")
    });
  } 

  const emailOnBlurHandler = async (e: React.FocusEvent<HTMLInputElement>)=>{
    await trigger("email");
   const value = e.target.value;
    const {isDirty,invalid}=getFieldState("email")  
    if(isDirty && !invalid && enteredEmail !== value){
      // checking
      checkEmailAvailability(value);
    }

    if(enteredEmail && isDirty&& invalid){
      restCheckEmailAvailability();
    }
  }

    useEffect(()=>{
      return()=>{
      dispatch(resetUI());
      }
    },[dispatch])

  return {loading,error,accessToken,formErrors,register,handleSubmit,emailAvailabilityStatus,submitFrom,emailOnBlurHandler}
}

export default useRegister
