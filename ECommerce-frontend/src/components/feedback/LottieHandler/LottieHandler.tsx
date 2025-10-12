import Lottie from "lottie-react";
import notFound from "@assets/lottieFiles/notFound.json";
import empty from "@assets/lottieFiles/empty.json";
import error from "@assets/lottieFiles/error.json";
import loading from "@assets/lottieFiles/loading.json";

const lottieFilesMap = {
    notFound,
    empty,
    error,
    loading,
}
type LottieHandlerProps ={
    type:keyof typeof lottieFilesMap; 
    message?: string;
}


const LottieHandler = ({type,message}:LottieHandlerProps) => {
    const lottie = lottieFilesMap[type];
    const messageStyle = type ==="error"?{fontSize:"19px ",color:"red" } 
    :{fontSize:"19px ", marginTop:"30px"} ;
    const widthStyle = type==="notFound"? {width:"700px"}
    :{width:"400px"} ;
  return (
    <div className="d-flex flex-column align-items-center">
        <Lottie   animationData={lottie} style={widthStyle}/>
        {message && <h3 style={messageStyle}> {message}</h3>}
    </div>
  )
}

export default LottieHandler
