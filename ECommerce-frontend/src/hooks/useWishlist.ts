import { useEffect } from "react";
import { useAppSelector,useAppDispatch } from "@store/hooks";
import { actGetWishlist,cleanWishlistProductsFullInfo } from "@store/wishlist/wishlistSlice";
const useWishlist = () => {
    const dispatch = useAppDispatch()
  const { loading, error,productsFullInfo } = useAppSelector((state) => state.wishlist);
  const cartItems =useAppSelector((state)=> state.cart.items);
  useEffect(()=>{
   const promise=dispatch(actGetWishlist("ProductFullInfo")) 
   return()=>{
    dispatch(cleanWishlistProductsFullInfo())
    promise.abort();
   }
  },[dispatch])

  const records = productsFullInfo.map((el)=>({
    ...el,
    quantity:cartItems[el.id] ,
    isLiked:true,
    isAuthenticated:true,
  }));

    return {loading,error,records}
}

export default useWishlist
