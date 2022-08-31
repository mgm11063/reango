import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { render } from "react-dom";
import Room from "./Routes/Room";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Room />}></Route>
      </Routes>
    </Router>
  );
}

export default App;

const appDiv = document.getElementById("app");
render(<App />, appDiv);
