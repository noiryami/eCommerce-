import CategorySkeleton from "../skeletons/CategorySkeleton/CategorySkeleton";
import ProductSkeleton from "../skeletons/ProductSkeleton/ProductSkeleton";
import CartSkeleton from "../skeletons/CartSkeletons/CartSkeletons";
import {type TLoading} from "@types"
import LottieHandler from "../LottieHandler/LottieHandler";

const skeletonsType ={
    category :CategorySkeleton,
    cart:CartSkeleton,
    product:ProductSkeleton,
}

type LoadingProps = {
    status: TLoading;
    error: null | string; 
    children : React.ReactNode;
    type?: keyof typeof skeletonsType;
}


const Loading = ({status,error,children,type ="category"}:LoadingProps) => {
  const Component = skeletonsType[type];      
   
  if(status=== "pending")
   {
    return <Component />
   }
   if(status=== "failed")
   {
    return <div>
       <LottieHandler message={error as string} type="error" />
    </div>
   }  
    return (
    <>
      {children}
    </>
  )
}

export default Loading
