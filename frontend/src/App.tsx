import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Rooms from "./Routes/reports/Reports";
import Room from "./Routes/reports/Report";
import RoomCreate from "./Routes/reports/ReportCreate";

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
