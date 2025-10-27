import { useEffect } from "react";
import { useAppDispatch,useAppSelector } from "@store/hooks";
import { actAuthLogin,resetUI } from "@store/auth/authSlice";
import { useSearchParams,useNavigate } from "react-router-dom";
import { useForm ,type SubmitHandler} from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { singInSchema,type singInType } from "@validations/singInSchema";
const useLogin = () => {
    
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [searchParams,setSearchParam]= useSearchParams();
  const {loading,error,accessToken}=useAppSelector(state=>state.auth)
  const {register,handleSubmit,formState:{errors:formErrors}}= useForm<singInType>({
  mode:"onBlur",
  resolver: zodResolver(singInSchema),} 
    );  

  const submitFrom:SubmitHandler<singInType> = (data)=>{
    if(searchParams.get("message")){
      setSearchParam("");
    }
      dispatch(actAuthLogin(data)).unwrap().then(()=>navigate("/"));
    }

    useEffect(()=>{
      return()=>{
      dispatch(resetUI());
      }
    },[dispatch])
  
    return  {loading,error,accessToken,register,handleSubmit,formErrors,submitFrom,searchParams}
}

export default useLogin
