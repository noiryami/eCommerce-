import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "@store/hooks";
import {
  actGetProductsByCatPrefix,
  cleanUpProductsRecords,
} from "@store/products/productsSlice"; 

const useProducts = () => {
  
  const params = useParams();
  const productPrefix = params.prefix;
  const dispatch = useAppDispatch();
  const { loading, error, records } = useAppSelector((state) => state.products);
  const cartItems =useAppSelector((state)=> state.cart.items);
  const withlistItemsId =useAppSelector((state)=>state.wishlist.itemsId);

  const userAccessToken =useAppSelector(state=>state.auth.accessToken)
  useEffect(() => {
    const promise = dispatch(actGetProductsByCatPrefix(params.prefix as string));

    return () => {
      dispatch(cleanUpProductsRecords());
      promise.abort(); 
          };
  }, [dispatch, params]);
  
  const productFullInfo = records.map((el)=>({
    ...el,
    quantity:cartItems[el.id] ,
    isLiked:withlistItemsId.includes(el.id),
    isAuthenticated: userAccessToken?true:false,
  }));
  
    return {loading,error,productFullInfo,productPrefix};
}

export default useProducts
