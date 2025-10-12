import useProducts from "@hooks/useProducts";
import { GridList,Heading } from "@components/common";
import { Product } from "@components/eCommerce";
import { Loading } from "@components/feedback"


const Products = () => {
  const {loading,productPrefix,productFullInfo,error}= useProducts();

  return (
    <>
      <Heading title={`${productPrefix?.toUpperCase()}  Products`}/> 
      <Loading  status={loading} error={error} type="product">
                <GridList emptyMessage="there is no products"
                records={productFullInfo} renderIteam={(record)=> <Product {...record} /> } />
      </Loading>

    </>
  );
};

export default Products;