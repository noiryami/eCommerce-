import { useEffect } from "react";
import { useAppDispatch,useAppSelector } from "@store/hooks";
import { actAuthLogin,resetUI } from "@store/auth/authSlice";
import { useSearchParams,useNavigate,Navigate } from "react-router-dom";
import { useForm ,type SubmitHandler} from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { singInSchema,type singInType } from "@validations/singInSchema";
import { Heading } from "@components/common";
import  {Form,Button,Row,Col,Alert, Spinner}  from "react-bootstrap";
import { Input } from "@components/Form";


const Login = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [searchParams,setSearchParam]= useSearchParams();
  const {loading,error,accessToken}=useAppSelector(state=>state.auth)
  const {register,handleSubmit,formState:{errors}}= useForm<singInType>({
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
    if(accessToken){
      return <Navigate to="/"/>
    }
  return (
<>
    <Heading title="User Login"/>
    <Row>
      <Col md={{span:6,offset:3}}>
      {searchParams.get("message")==="account_created"&& <Alert variant="success">Your account succesfully created,please login</Alert> }
       <Form onSubmit={handleSubmit(submitFrom)}>
        <Input label="Email address" name="email" register={register} error={errors.email?.message}  />
        <Input label="Password " type="password" name="password" register={register} error={  errors.password?.message}  />
        <Button variant="info" type="submit" style={{color:"white"}}>
          {loading==="pending"?<><Spinner animation="border" size="sm"></Spinner> loading...</>:"Submit"}
        </Button>
        {error && <p style={{color:"#DC3534",marginTop:"10px"}}>{error}</p>}        
      </Form>
      </Col>
    </Row>
      
    </>
   
  )
}

export default Login
