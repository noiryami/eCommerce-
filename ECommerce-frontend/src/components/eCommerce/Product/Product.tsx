import { useEffect,useState,memo } from "react";
import { useAppDispatch } from "@store/hooks";
import { actLikeToggle } from "@store/wishlist/wishlistSlice";
import { addToCart } from "@store/carts/cartsSlice";
import type {TProduct} from "@types";
import { Button ,Spinner } from "react-bootstrap";
import Like from "@assets/svg/like.svg?react";
import LikeFill from "@assets/svg/like-fill.svg?react";

import styles from "./styles.module.css";


const { product, productImg,maximumNotich,wishlistBtn } = styles;


const Product = memo(({ id,title, price, img, max, quantity,isLiked }: TProduct) => {
  const dispatch = useAppDispatch();
  const [isBtnDisabled,setIsBtnDisabled]=useState(false);
  const [isLoading,setIsLoading]= useState(false);
  const currentRemaingQuantity = max - (quantity ?? 0)
  const quantityReachedToMax = currentRemaingQuantity <=0 ? true:false;

  useEffect(()=>{
    if(!setIsBtnDisabled)
    {
      return;
    }
    const debounce =setTimeout(() => {
      setIsBtnDisabled(false)
    }, 300);

    return ()=>clearTimeout(debounce);

  },[isBtnDisabled])
  
  const addToCartHandler = () =>{
    dispatch(addToCart(id));
    setIsBtnDisabled(true);
  };

  const likeToggleHandler =()=>{  
    if(isLoading)
    {
      return;
    }
    setIsLoading(true);
    dispatch(actLikeToggle(id)).unwrap().then(()=> setIsLoading(false)).catch(()=>setIsLoading(false)); 
  };

  return (
    <div className={product}  > 
    <div className={wishlistBtn} onClick={likeToggleHandler}>
      {isLoading? <Spinner animation="border" size="sm" variant="primary" />:
      isLiked ? <LikeFill/> : <Like/>}
    </div>
      <div className={productImg}>  
        <img src={img} alt={title} />
      </div>
      <h2>{title}</h2>  
      <h3>{price.toFixed(2)} EGP</h3>
      <p className={maximumNotich}>{quantityReachedToMax ? "you have reached to the limit": `you can add ${currentRemaingQuantity} item(s)`    }</p>
      <Button variant="info" style={{ color: "white" }} onClick={addToCartHandler}
      disabled={isBtnDisabled || quantityReachedToMax}>
        {isBtnDisabled?<><Spinner animation="border" size="sm" />loading....</>: "Add to cart"}
        
      </Button>
    </div>
  );
});

export default Product;
