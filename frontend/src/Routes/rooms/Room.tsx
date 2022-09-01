import { useQuery } from "react-query";
import { useLocation, useParams } from "react-router-dom";
import styled from "styled-components";
import { getRoom, IRoom } from "../../api";

const Title = styled.h4`
  font-size: 2em;
`;

const Container = styled.div``;
interface IRoomLocation {
  state: {
    name: string;
    address: string;
    price: number;
  };
}

const Overview = styled.div`
  display: flex;
  justify-content: space-between;
  background-color: rgba(0, 0, 0, 0.5);
  padding: 10px 20px;
  border-radius: 10px;
`;

function Room() {
  const { state } = useLocation() as IRoomLocation; // from rooms link data

  const { id: roomId } = useParams();
  const { data, isLoading } = useQuery<IRoom>(
    ["info", getRoom],
    () => getRoom(roomId!) // ! 타입스크립트 구문 에러뜨면 이 째끼 때문임 v6 올라오면서 체크하는 구문 생겨서 오류남 fuck ;
  );

  return (
    <Container>
      {state != null ? (
        <>
          <Title>{state?.name} from link</Title>
          <Overview>
            <span>{state?.address}</span>
            <span>{state?.price}</span>
          </Overview>
        </>
      ) : isLoading ? (
        "Lodging"
      ) : (
        <>
          <Title>{data?.name} from react-query</Title>
          <Overview>
            <span>{data?.address}</span>
            <span>{data?.price}</span>
          </Overview>
        </>
      )}
    </Container>
  );
}

export default Room;
