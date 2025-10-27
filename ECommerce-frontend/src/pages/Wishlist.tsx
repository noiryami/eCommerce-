import useWishlist from "@hooks/useWishlist";
import { GridList,Heading } from "@components/common";
import { Product } from "@components/eCommerce";
import { Loading } from "@components/feedback"
import type { TProduct } from "@/types";

const Wishlist = () => {
  const {loading,error,records}=useWishlist();

  return (
    <>
      <Heading title="Your Wishlist"/>
      <Loading  status={loading} error={error} type="product">
          <GridList<TProduct> emptyMessage="your wishlist is empty"
          records={records} renderIteam={(record)=> <Product {...record} /> } />
      </Loading>

    </>
  )
}

export default Wishlist
