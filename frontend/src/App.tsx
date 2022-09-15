import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Reports from "./Routes/reports/Reports";
import Report from "./Routes/reports/Report";
import ReportCreate from "./Routes/reports/ReportCreate";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="reports/" element={<Reports />}></Route>
        <Route path="reports/create/" element={<ReportCreate />}></Route>
        <Route path="reports/:id/" element={<Report />} />
      </Routes>
    </Router>
  );
}

export default App;
