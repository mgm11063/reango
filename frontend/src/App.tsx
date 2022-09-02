import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Rooms from "./Routes/rooms/Rooms";
import Room from "./Routes/rooms/Room";
import RoomCreate from "./Routes/rooms/RoomCreate";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="rooms/" element={<Rooms />}></Route>
        <Route path="rooms/create/" element={<RoomCreate />}></Route>
        <Route path="rooms/:id/" element={<Room />} />
      </Routes>
    </Router>
  );
}

export default App;
