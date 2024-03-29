import { Route, Routes } from "react-router-dom";
import Home from "./Pages/Home";
import Header from "./Components/Header";
import SignUp from "./Pages/SignUp";
import SignIn from "./Pages/SignIn";
import ProtectedRoute from "./Components/ProtectedRoute";
import Dashboard from "./Pages/Dashboard";
import HospitalsList from "./Pages/HospitalsList";
import ParticularHospitalDoctors from "./Components/ParticularHospitalDoctors";
import MyAppointments from "./Pages/MyAppointments";
import MyRecentAppointments from "./Components/MyRecentAppointments";
import DoctorAppointments from "./Pages/DoctorAppointments";

function App() {
  return (
    <div className="p-10">
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/signin" element={<SignIn />} />
        <Route element={<ProtectedRoute />}>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route
            path="/recentappointments"
            element={<MyRecentAppointments />}
          />
          <Route
            path="/doctorAppointments/:id"
            element={<DoctorAppointments />}
          />
        </Route>
        <Route path="/hospitalsList" element={<HospitalsList />} />
        <Route
          path="/doctors/:hospitalId"
          element={<ParticularHospitalDoctors />}
        />
        <Route path="/appointments" element={<MyAppointments />} />
      </Routes>
    </div>
  );
}

export default App;
