
import HeaderCounter from "../HeaderCounter/HeaderCounter";
import { useAppSelector } from "@store/hooks";
import {getCartTotalQuantitySelector} from "@store/carts/selectors"
import WishlistIcon from "../../../../assets/svg/wishlist.svg?react"
import CartIcon from "../../../../assets/svg/cart.svg?react"

import styles from "./styles.module.css";
const {headerLeftbar}=styles;
const HeaderLeftbar = () => {
        const  cartTotalQuantity = useAppSelector(getCartTotalQuantitySelector)
    const wishlistTotalQuantity = useAppSelector(state =>state.wishlist.itemsId.length)

  return (
        <div className={headerLeftbar}>
            <HeaderCounter  to="wishlist" totalQuantity={wishlistTotalQuantity} svgIcon={<WishlistIcon title="wishlist"/>}
                title="Wishlist" />
            <HeaderCounter to="cart" totalQuantity={cartTotalQuantity} svgIcon={<CartIcon title="cart"/>} title="Cart" />
        </div>
  )
}

export default HeaderLeftbar
