import useLogin from "@hooks/useLogin";
import { Navigate } from "react-router-dom";
import { Heading } from "@components/common";
import  {Form,Button,Row,Col,Alert, Spinner}  from "react-bootstrap";
import { Input } from "@components/Form";


const Login = () => {
    const {loading,error,accessToken,register,handleSubmit,formErrors,submitFrom,searchParams} =useLogin();
    if(accessToken){
      return <Navigate to="/"/>
    }
  return (
<>
    <Heading title="User Login"/>
    <Row>
      <Col md={{span:6,offset:3}}>
      {searchParams.get("message")==="login_required"&& <Alert variant="success">You need to login to view this content  </Alert> }
      {searchParams.get("message")==="account_created"&& <Alert variant="success">Your account succesfully created,please login</Alert> }
       <Form onSubmit={handleSubmit(submitFrom)}>
        <Input label="Email address" name="email" register={register} error={formErrors.email?.message}  />
        <Input label="Password " type="password" name="password" register={register} error={  formErrors.password?.message}  />
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
