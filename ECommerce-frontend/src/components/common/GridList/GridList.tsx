import { Row,Col } from "react-bootstrap"
import { LottieHandler } from "@components/feedback";

type GridlistProps<T> = {
    records: T[];
    renderIteam: (record:T)=> React.ReactNode;
    emptyMessage:string;
}

type HasId = {id?:number};

const GridList = <T extends HasId >({records,renderIteam,emptyMessage}:GridlistProps <T>) => {
const categoriesList = records.length > 0 ? records.map((record) =>
        <Col xs={6} md={3} key={record.id} className="d-flex justify-content-center mb-5 mt-2">
          {renderIteam(record)}
        </Col>
  ) : <LottieHandler type="empty" message={emptyMessage}/>;

  return (
      <Row>
        {categoriesList}
      </Row>
  )
}

export default GridList
