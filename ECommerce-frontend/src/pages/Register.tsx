/* eslint-disable no-constant-binary-expression */
import { useAppDispatch,useAppSelector } from "@store/hooks";
import { actAuthRegister, resetUI } from "@store/auth/authSlice";
import { useForm,type SubmitHandler, } from "react-hook-form";
import { Navigate, useNavigate } from "react-router-dom";
import { zodResolver } from "@hookform/resolvers/zod";
import { singUpSchema, type singUpType } from "@validations/singUpSchema";
import { Heading } from "@components/common";
import useCheckEmailAvailability from "@hooks/useCheckEmailAvailability";
import { Input } from "@components/Form";
import  {Form,Button,Row,Col,Spinner}  from "react-bootstrap";
import { useEffect } from "react";




const Register = () => {
  const navgate = useNavigate();
  const dispatch =useAppDispatch();
  const {loading,error,accessToken}= useAppSelector((state)=>state.auth);



const {register,handleSubmit,trigger,getFieldState,formState:{errors}}= useForm<singUpType>({
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

    if(accessToken){
      return <Navigate to="/"/>
    }
  return (
    <>
    <Heading title="User Registration" />
    <Row>
      <Col md={{span:6,offset:3}}   >
       <Form onSubmit={handleSubmit(submitFrom)}>
        <Input label="First name" name="firstName" register={register} error={errors.firstName?.message}  />
        <Input label="Last name" name="lastName" register={register} error={errors.lastName?.message}  />
        <Input label="Email address" name="email" register={register} 
        error={errors.email?.message ? errors.email?.message : emailAvailabilityStatus==="notAvailable"?"This email is already in use":emailAvailabilityStatus==="failed"?"Error from the server":""} 
        disabled={emailAvailabilityStatus==="checking"?true:false} onBlur={emailOnBlurHandler} 
        formText={emailAvailabilityStatus=== "checking"?"We are currently checking your email.Please wait" :" "}
        success={emailAvailabilityStatus==="available"?"This email is availabile to use.":""} />
        <Input label="Password " type="password" name="password" register={register} error={errors.password?.message}  />
        <Input label="Confirm Password" type="password" name="confirmPassword" register={register} error={errors.confirmPassword?.message}  />


        <Button variant="info" type="submit" style={{color:"white"}} disabled={emailAvailabilityStatus==="checking"?true:false ||loading==="pending"
        } >
          {loading==="pending"?<><Spinner animation="border" size="sm"></Spinner> loading...</>:"Submit"}
        </Button>
        {error && <p style={{color:"#DC3534",marginTop:"10px"}}>{error}</p>}
      </Form>
      </Col>
    </Row>
      
    </>
   
  )
}

export default Register