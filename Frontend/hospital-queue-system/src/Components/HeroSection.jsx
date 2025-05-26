import React from "react";
import { NavLink } from "react-router-dom";
import NavBar from "./NavBar";
import { CalendarDays, Clock, BarChart3 } from "lucide-react";
import QueueImage from "../assets/Hospital.png"



const HeroSection =()=>{
    return (
    <div className="bg-white min-h-screen flex flex-col justify-center items-center p-6">
      <section className="max-w-6xl w-full flex flex-col-reverse md:flex-row items-center gap-10 md:gap-16">
        <div className="flex-1">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Streamline Your Hospital’s Queue
          </h1>
          <p className="text-gray-600 mb-6">
            Enhance patient experience by streamlining the appointment and check-in process at your hospital.
          </p>
          <NavLink to = "/register/patient">
          <button className="bg-blue-600 text-white px-6 py-3 rounded-full shadow-md hover:bg-blue-700 transition">
            Get Started
          </button>
          </NavLink>
        </div>

        
        <div className="flex-1">
          <img
            src= {QueueImage}
            alt="Queue Illustration"
            className="w-full max-w-md mx-auto"
          />
        </div>
      </section>

   
      <section className="mt-20 grid grid-cols-1 md:grid-cols-3 gap-10 text-center">
        <div className="flex flex-col items-center">
          <CalendarDays className="h-10 w-10 text-blue-600 mb-2" />
          <h3 className="font-semibold text-lg">Manage Appointments</h3>
        </div>
        <div className="flex flex-col items-center">
          <Clock className="h-10 w-10 text-blue-600 mb-2" />
          <h3 className="font-semibold text-lg">Reduce Wait Times</h3>
        </div>
        <div className="flex flex-col items-center">
          <BarChart3 className="h-10 w-10 text-blue-600 mb-2" />
          <h3 className="font-semibold text-lg">Improve Efficiency</h3>
        </div>
      </section>
    </div>
  );
};
export default HeroSection;