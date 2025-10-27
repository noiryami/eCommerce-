type ProductInfoProps={
    title:string;
    img:string;
    price:number;
    direction?:"row"|"column";
    children?:React.ReactNode;
    style?:React.CSSProperties;
}

const ProductInfo = ({title,img,price,direction="row",children,style}:ProductInfoProps) => {
  return (
    <div>ProductInfo</div>
  )
}

export default ProductInfo