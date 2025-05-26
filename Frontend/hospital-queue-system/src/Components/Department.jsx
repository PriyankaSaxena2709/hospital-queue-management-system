import React from "react";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Department=()=>{
    // const departments = [
    //     {
    //       name: "ENT",
    //       doctor: "Dr. Mehta",
    //       timing: "10:00 AM - 12:00 PM",
    //     },
    //     {
    //       name: "Cardiology",
    //       doctor: "Dr. Sharma",
    //       timing: "11:00 AM - 1:00 PM",
    //     },
    //     {
    //       name: "Dermatology",
    //       doctor: "Dr. Kapoor",
    //       timing: "1:30 PM - 3:30 PM",
    //     },
    //     {
    //       name: "Neurology",
    //       doctor: "Dr. Verma",
    //       timing: "2:00 PM - 4:00 PM",
    //     },
    //   ];
      const[dept, setDept] = useState([]);

      const navigate = useNavigate();

      useEffect(()=>{
        const fetchDoctors = async()=>{
          try{
            const response = await fetch(`http://localhost:5000/doctor/department`);
            const data = await response.json();
            console.log(data);

            // const departmentData = data.map(doc =>({
            //   name : doc.department
            // }));
            setDept(data);
  
          }catch(error){
            console.log("Error fetching doctors", error);
          }
        };

        fetchDoctors();
      },[]);
    
      const handleSubmit = async(department)=>{
        const formattedName = department.trim().toLowerCase();
        navigate(`/doctorlist/${formattedName}`);
      }

      return (
        <div className="w-full min-h-screen px-10 py-10 bg-gray-100">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6"> 
            {dept.map((dept, index) => (
              <div
                key={index}
                className="h-[200px] flex flex-col justify-between p-5 bg-blue-100 text-gray-700 rounded-xl shadow-lg hover:scale-105 transition-all duration-300"
              >
                <div>
                  <h3 className="text-xl font-bold text-center text-blue-800">{dept}</h3>
                  {/* <p className="mt-4 text-[15px]"><span className="font-semibold">Doctor:</span> {dept.doctor}</p> */}
                  {/* <p className="text-[15px]"><span className="font-semibold">Days:</span> {dept.days}</p> */}
                </div>
                <button onClick={()=>handleSubmit(dept)} className="mt-6 bg-blue-600 text-white font-bold py-2 rounded-md hover:bg-blue-700 transition">
                  Show Doctors List 
                </button>
              </div>
            ))}
          </div>
        </div>
      );
    };


export default Department;