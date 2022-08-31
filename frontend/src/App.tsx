import { useQuery } from "react-query";
import styled from "styled-components";
import { getRooms, IRoom } from "./api";

const Intro = styled.div`
  font-size: 1em;
`;

const Box = styled.div``;

function App() {
  const { data, isLoading } = useQuery<IRoom[]>(
    ["rooms", "showRoom"],
    getRooms
  );

  console.log(data, isLoading);

  return (
    <Intro>
      {data?.map((room) => (
        <Box>{room.address}</Box>
      ))}
    </Intro>
  );
}

export default App;
