import { BrowserRouter, Routes, Route } from "react-router";
import Login from "./components/Login";
import Dashboard from "./components/Dashboard";
import Home from "./components/Home";
import AddDoctor from "./components/AddDoctor";

export default function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route element={<Home />}>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/add_doctor" element= {<AddDoctor/>}/>
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}
