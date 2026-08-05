import { BrowserRouter, Routes, Route } from "react-router";
import Login from "./components/Login";
import Dashboard from "./components/Dashboard";
import Home from "./components/Home";
import AddDoctor from "./components/AddDoctor";
import Doctors from "./components/Doctor";
import Receptionist from "./components/Receptionist";
import Pharmacist from "./components/Pharmacist";
import AddParmacist from "./components/AddParmacist";
import AddReceptionist from "./components/AddReceptionist";
import Patient from "./components/Patient";
import AddPatient from "./components/AddPatient";
import BookAppointment from "./components/Appointment";

export default function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route element={<Home />}>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/add_doctor" element={<AddDoctor />} />
            <Route path="/doctors" element={<Doctors />} />
            <Route path="/receptionist" element={<Receptionist />} />
            <Route path="/pharmacist" element={<Pharmacist />} />
            <Route path="/add_pharmacist" element={<AddParmacist />} />
            <Route path="/add_receptionist" element={<AddReceptionist />} />
            <Route path="/patients" element={<Patient />} />
            <Route path="/add_patient" element={<AddPatient />} />
            <Route path="/bookappoitment" element={<BookAppointment />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}
