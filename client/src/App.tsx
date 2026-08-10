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
import AddPatient from "./components/AddPatient";
import BookAppointment from "./components/BookAppointment";
import AddConsultation from "./components/AddConsultation";
// import AddPrescription from "./components/AddPrescription";
import UpdateDoctor from "./components/EditDoctor";
import EditParmacist from "./components/EditPharmacist";
import EditReceptionist from "./components/EditReceptionist";
import Appointment from "./components/Appointment";
import Departments from "./components/Department";
import DoctorAppointment from "./components/Doctor/DoctorAppointment";
import Patients from "./components/Patient";
import Patient from "./components/Doctor/PatientAppointment";
import PrescriptionAppointments from "./components/Pharmacist /GeneratedPrescription";
import Prescription from "./components/Pharmacist /Prescription";
import PublicRoute from "./components/PublicRouter";
import ProtectedRouter from "./components/PrivateRouter";

export default function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route element={<PublicRoute />}>
            <Route path="/" element={<Login />} />
          </Route>
          <Route element={<ProtectedRouter />}>
            <Route element={<Home />}>
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/add_doctor" element={<AddDoctor />} />
              <Route path="/doctors" element={<Doctors />} />
              <Route path="/receptionist" element={<Receptionist />} />
              <Route path="/pharmacist" element={<Pharmacist />} />
              <Route path="/add_pharmacist" element={<AddParmacist />} />
              <Route path="/add_receptionist" element={<AddReceptionist />} />
              <Route path="/patients" element={<Patients />} />
              <Route path="/add_patient" element={<AddPatient />} />
              <Route path="/bookappoitment" element={<BookAppointment />} />
              <Route path="/add_consultation" element={<AddConsultation />} />
              {/* <Route path="/add_prescription" element={<AddPrescription />} /> */}
              <Route path="/edit_doctor" element={<UpdateDoctor />} />
              <Route path="/edit_pharmasist" element={<EditParmacist />} />
              <Route path="/edit_receptionist" element={<EditReceptionist />} />
              <Route path="/appointment" element={<Appointment />} />
              <Route path="/departments" element={<Departments />} />
              <Route
                path="/doctor_appointment"
                element={<DoctorAppointment />}
              />
              <Route path="/patient" element={<Patient />} />
              <Route
                path="/pres_gen_appoints"
                element={<PrescriptionAppointments />}
              />
              <Route path="/prescription" element={<Prescription />} />
            </Route>
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}
