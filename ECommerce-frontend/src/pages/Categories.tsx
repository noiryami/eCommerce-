import useCategories from "@hooks/useCategories"
import { GridList, Heading } from "@components/common"
import { Category } from "@components/eCommerce"
import { Loading } from "@components/feedback"

const Categories = () => {
  const {loading,error,records}=useCategories();

  return (
  <>
    <Heading title="Categories"/>   
    <Loading  status={loading} error={error} type="category">
      <GridList emptyMessage="there is no categories"
      records={records} renderIteam={(record)=> <Category {...record}   /> } />
    </Loading>
       
  </>    
      
  )
}

export default Categories
