import { useCallback, useEffect } from "react";
import { useAppDispatch,useAppSelector } from "@store/hooks";
import { actGetProductsByItems,cartItemChangeQuantity,cartItemRemove,cleanCartproductsFullInfo } from "@store/carts/cartsSlice";

const useCart = () => {
      const dispatch= useAppDispatch()
  const {items,productsFullInfo,loading,error}=useAppSelector((state)=>state.cart);
  
  
  useEffect (()=>{const promise =dispatch(actGetProductsByItems())
    return ()=>{
      dispatch(cleanCartproductsFullInfo())
      promise.abort();
    }
  },[dispatch] )

  const products =productsFullInfo.map((el)=>({...el,quantity:items[el.id]}));

  const changeQuantityHandler = useCallback((id:number,quantity:number)=>{
    dispatch(cartItemChangeQuantity({id,quantity}));
    
  },[dispatch]);

  const removeItemHandler = useCallback((id:number)=>{
    dispatch(cartItemRemove(id))
  },[dispatch])
  return {products,changeQuantityHandler,removeItemHandler,loading,error}
}

export default useCart
