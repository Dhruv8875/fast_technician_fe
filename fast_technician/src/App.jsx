import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Dashboard from "./Pages/Dashboard";
import TechnicianRegister from "./Pages/Ragister";
import TechnicianLogin from "./Pages/Login";
import RequestsPage from "./Pages/RequestsPage";


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<TechnicianLogin />} />
        {/* <Route path="/register" element={<Register />} /> */}
        <Route path="/" element={<Dashboard />} />
        <Route path="/ragister" element={<TechnicianRegister  />} />
        <Route path="/requests" element={<RequestsPage />} />
      </Routes>
    </Router>
  );
}

export default App;
