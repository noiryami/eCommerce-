import { z} from "zod";

const singUpSchema=z.object({
  firstName:z.string().min(1,{message: "First name is required" }),
  lastName:z.string().min(1,{message: "Last name is required" }),
  email:z.string().min(1,{message: "Email address is required" }).email(),
  password:z.string().min(8,{message: "password must be at least 8 characters" })
  .regex(/[!@#$%^&*(),.?":{}|<>]/, "Password must contain at least one special character."),
  confirmPassword:z.string().min(1,{message: "confirmPassword is required" }),

}).refine(input => input.password ===input.confirmPassword ,{message:"Password and confirom password aren't match",path:["confirmPassword"],}  
)

type singUpType =z.infer<typeof singUpSchema>  

export {singUpSchema,type singUpType}; 
  ; // This regex specifically targets common special characters.
