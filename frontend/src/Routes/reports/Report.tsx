import { useQuery } from "react-query";
import { useLocation, useParams } from "react-router-dom";
import { getRoom } from "../../api/api";
import { IReport } from "../../api/types";
import { Container, Overview, Title } from "../../StyledComponents";

interface IRoomLocation {
  state: {
    title: string;
  };
}

function Room() {
  const { state } = useLocation() as IRoomLocation; // IDK It Just Works ...haha**
  const { id: reportId } = useParams();
  const { data, isLoading } = useQuery<IReport>(
    ["info", getRoom],
    () => getRoom(reportId!) // ! 타입스크립트 구문 에러뜨면 이 째끼 때문임 v6 올라오면서 체크하는 구문 생겨서 오류남 fuck ;
  );

  return (
    <Container>
      {state != null ? (
        <>
          <Title>{state?.title} from link</Title>
          <Overview>
            <span>{state?.title}</span>
          </Overview>
        </>
      ) : isLoading ? (
        "Lodging"
      ) : (
        <>
          <Title>{data?.title} from react-query</Title>
          <Overview>
            <span>{data?.title}</span>
            <span>{data?.datetime}</span>
            <span>{data?.department}</span>
          </Overview>
        </>
      )}
    </Container>
  );
}

export default Room;
