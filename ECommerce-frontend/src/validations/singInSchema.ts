import { z} from "zod";

const singInSchema=z.object({
  email:z.string().min(1,{message: "Email address is required" }).email(),
  password:z.string().min(1,{message: "Password is required" }),
})
type singInType =z.infer<typeof singInSchema>  

export {singInSchema,type singInType}; 
  ; // This regex specifically targets common special characters.
