import { Badge } from "react-bootstrap"
import { memo } from "react"
const Heading = memo(({title}:{title:string}) => {
  return (
    <h2>
      <Badge bg="info" style={{fontSize:"26px",fontFamily:"sans-serif"}}>{title}</Badge>
    </h2>
  )
});

export default Heading
