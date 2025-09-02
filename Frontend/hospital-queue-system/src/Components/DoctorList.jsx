import { useParams } from "react-router-dom";
import { useState } from "react";
import DoctorCard from "./DoctorCard";
import { useEffect } from "react";

const DoctorList=()=>{
    // const doctors = [
    //     {
    //         name : "Dr. Mishra",
    //         days : "Monday, Tuesday",
    //         experience: "15 years"
    //     },
    //     {
    //         name: "Dr. Kritika Verma",
    //         days: "Monday",
    //         experience: "10 years"
    //     },
    //     {
    //         name: "Dr. Dharmesh Jain",
    //         days: " Tuesday, Thursday, Friday",
    //         experience: "20 years"
    //     },
    //     {
    //         name: "Dr. Nitin Mishra",
    //         days: " Monday, Wednesday, Friday",
    //         experience: "5 years"
    //     }
    // ];
    const {department} = useParams();
    const [doctors, setDoctors] = useState([]);
    console.log(doctors);

    useEffect(()=>{
      const fetchDoctors = async()=>{
        try{
          const response = await fetch(`https://hospital-queue-management-system-0jm3.onrender.com/doctor/${department}`);
          const data = await response.json();
          console.log(data);
          setDoctors(data);
        }catch(error){
          console.log("error fetching doctor by department", error);
        }
      };
      fetchDoctors();
    },[department]);

  return(
    <div className="w-full px-10 py-10 bg-gray-100">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {doctors.map((doc, index) => (
          <DoctorCard key={index} doctor={doc} />
        ))}
      </div>
    </div>
  )
};
export default DoctorList;

