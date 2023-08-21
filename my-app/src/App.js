import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Routes,
} from "react-router-dom";
import Login from "./components/Auth/Login";
import Register from "./components/Auth/Register";
import CreateOrder from "./components/Manufacturer/CreateOrder";
import ManufacturerDashboard from "./components/Manufacturer/ManufacturerDashboard";
import TransporterDashboard from "./components/Transporter/TransporterDashboard";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/createOrder" element={<CreateOrder />} />
        <Route
          path="/manufacturerdashboard"
          element={<ManufacturerDashboard />}
        />
        <Route
          path="/transporterDashboard"
          element={<TransporterDashboard />}
        />
      </Routes>
    </Router>
  );
}

export default App;
