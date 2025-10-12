import axios from "axios";
import { useState } from "react";

type TStatus = "idel"|"checking"|"available"|"notAvailable"|"failed";

const useCheckEmailAvailability= ()=>{
    const [emailAvailabilityStatus , setEmailAvailabilityStatus] = useState<TStatus>("idel");
    const [enteredEmail , setEnteredEmail]= useState<null|string>(null);

    const checkEmailAvailability = async (email:string )=>{ 
         setEnteredEmail(email);
         setEmailAvailabilityStatus("checking");

        try {
            const response = await axios.get(`/users?email=${email}`);
            if(!response.data.length){  
                setEmailAvailabilityStatus("available")
            }else{
                setEmailAvailabilityStatus("notAvailable")
            }

        } catch (error) {
          setEmailAvailabilityStatus("failed");   
        }
    }

    const restCheckEmailAvailability = ()=>{
        setEmailAvailabilityStatus("idel");
        setEnteredEmail(null);
    }
    return {emailAvailabilityStatus,enteredEmail,checkEmailAvailability,restCheckEmailAvailability };
}

export default useCheckEmailAvailability;