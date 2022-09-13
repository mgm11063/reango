import { useQuery } from "react-query";
import { IRoom } from "../../api/types";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { getRoomList } from "../../api/api";

const Container = styled.div`
  padding: 0px 20px;
`;
const Title = styled.h1`
  font-size: 48px;
`;
const Header = styled.header`
  height: 15vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;
const RoomList = styled.ul``;
const Room = styled.li`
  background-color: white;
  color: ${(props) => props.theme.bgColor};
  border-radius: 15px;
  margin-bottom: 10px;
  a {
    padding: 20px;
    transition: color 0.2s ease-in;
    display: block;
  }
  &:hover {
    a {
      color: ${(props) => props.theme.accentColor};
    }
  }
`;

function Rooms() {
  const { data } = useQuery<IRoom[]>("rooms", getRoomList);

  return (
    <Container>
      <Header>
        <Title>Notion</Title>
      </Header>
      <RoomList>
        {data?.map((room, index) => (
          <Room key={index}>
            <Link
              to={`${room.id}`}
              state={{
                name: room.name,
                address: room.address,
                price: room.price,
                check_in: room.check_in,
              }}
            >
              {room.name}
            </Link>
          </Room>
        ))}
      </RoomList>
    </Container>
  );
}

export default Rooms;
