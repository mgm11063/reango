import { useQuery } from "react-query";
import { IReport } from "../../api/types";
import { Link } from "react-router-dom";
import { getRoomList } from "../../api/api";
import {
  Container,
  Header,
  Room,
  RoomList,
  Title,
} from "../../StyledComponents";

function Reports() {
  const { data } = useQuery<IReport[]>("reports", getRoomList);
  return (
    <Container>
      <Header>
        <Title>Notion</Title>
      </Header>
      <RoomList>
        {data?.map((report, index) => (
          <Room key={index}>
            <Link
              to={`${report.id}`}
              state={{
                title: report.title,
              }}
            >
              {report.title}
            </Link>
          </Room>
        ))}
      </RoomList>
    </Container>
  );
}

export default Reports;
