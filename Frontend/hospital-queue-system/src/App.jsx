import React from "react";
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import HeroSection from "./Components/HeroSection";
import NavBar from "./Components/NavBar";
import Login from "./Components/Login";
import DoctorLogin from "./Components/DoctorLogin";
import Register from "./Components/Register";
import DoctorRegister from "./Components/DoctorRegister";
import Department from "./Components/Department";
import PatientDashboard from "./Components/PatientDashboard";
import DoctorDashboard from "./Components/DoctorDashboard";
import DoctorCard from "./Components/DoctorCard";
import DoctorList from "./Components/DoctorList";

function App() {


  return (
    <BrowserRouter>
       <NavBar /> 
      <Routes>
        <Route path="/" element={<HeroSection />} />
        <Route path="/register/patient" element={<Register/>} />
        <Route path="/register/doctor" element={<DoctorRegister/>} />
        <Route path="/login" element={<Login/>}/>
        <Route path="/login/doctor" element={<DoctorLogin/>}/>
        <Route path="/department" element={<Department/>}/>
        <Route path="/patient" element={<PatientDashboard/>}/>
        <Route path="/doctor" element={<DoctorDashboard/>}/>
        <Route path = "/doctorlist/:department" element={<DoctorList/>}/>
      </Routes>
    </BrowserRouter>
  )
}

export default App
