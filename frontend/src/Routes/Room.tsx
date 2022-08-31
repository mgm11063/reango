import { useQuery } from "react-query";
import { getRooms, IRoom } from "../api";
import styled from "styled-components";

const Intro = styled.div`
  font-size: 1em;
`;

const Box = styled.div``;

function Room() {
  const { data, isLoading } = useQuery<IRoom[]>(
    ["rooms", "showRoom"],
    getRooms
  );

  console.log(data);

  return (
    <Intro>
      {data?.map((room) => (
        <Box>{room.address}</Box>
      ))}
    </Intro>
  );
}

export default Room;
