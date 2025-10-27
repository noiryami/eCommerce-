/* eslint-disable no-constant-binary-expression */
import useRegister from "@hooks/useRegister";
import { Navigate } from "react-router-dom";
import { Heading } from "@components/common";

import { Input } from "@components/Form";
import  {Form,Button,Row,Col,Spinner}  from "react-bootstrap";

const Register = () => {
 const {loading,error,accessToken,formErrors,register,handleSubmit,emailAvailabilityStatus,submitFrom,emailOnBlurHandler} =useRegister();
  if(accessToken){
      return <Navigate to="/"/>
    }
  return (
    <>
    <Heading title="User Registration" />
    <Row>
      <Col md={{span:6,offset:3}}   >
       <Form onSubmit={handleSubmit(submitFrom)}>
        <Input label="First name" name="firstName" register={register} error={formErrors.firstName?.message}  />
        <Input label="Last name" name="lastName" register={register} error={formErrors.lastName?.message}  />
        <Input label="Email address" name="email" register={register} 
        error={formErrors.email?.message ? formErrors.email?.message : emailAvailabilityStatus==="notAvailable"?"This email is already in use":emailAvailabilityStatus==="failed"?"Error from the server":""} 
        disabled={emailAvailabilityStatus==="checking"?true:false} onBlur={emailOnBlurHandler} 
        formText={emailAvailabilityStatus=== "checking"?"We are currently checking your email.Please wait" :" "}
        success={emailAvailabilityStatus==="available"?"This email is availabile to use.":""} />
        <Input label="Password " type="password" name="password" register={register} error={formErrors.password?.message}  />
        <Input label="Confirm Password" type="password" name="confirmPassword" register={register} error={formErrors.confirmPassword?.message}  />


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