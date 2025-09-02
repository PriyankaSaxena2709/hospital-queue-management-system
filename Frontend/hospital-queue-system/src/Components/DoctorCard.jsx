import React from "react";
import { useNavigate } from "react-router-dom";

const DoctorCard = ({doctor})=>{
    const navigate = useNavigate();

    const handleJoin = async()=>{
        const token = localStorage.getItem("token");
        // console.log(token);

       try{
        const response = await fetch(`https://hospital-queue-management-system-0jm3.onrender.com/patient/join-queue`,{
          method: 'POST',
          headers: {
            "Content-Type": "application/json",
            "Authorization": `${token}`
          },
          body:JSON.stringify({
            doctorId : doctor._id
          })
        });

        const data = await response.json();
        console.log(data);

        if(response.ok){
          alert(`You have joined the ${data.department} of ${data.name} queue. Your token number is ${data.tokenNumber} `)
          navigate("/patient");
        }else{
          alert(data.msg);
        }
       }catch(error){
        console.log("Join queue error", error);
       }
      };

    return(
        <div className="w-full min-h-screen px-10 py-10 bg-gray-100">
                <div className="h-[300px] flex flex-col justify-between p-5 bg-blue-100 text-gray-700 rounded-xl shadow-lg hover:scale-105 transition-all duration-300">
                <h3 className="text-xl font-bold text-center text-blue-800">{doctor.name}</h3>
                <p className="mt-6 text-[18px] "><span className="font-bold">ID: </span>{doctor.ID}</p>
                <p className="mt-6 text-[18px] "><span className="font-bold">Available Days:</span> {doctor.days}</p>
                <button onClick={handleJoin} className=" mt-6 bg-blue-600 text-white font-bold py-2 rounded-md hover:bg-blue-700 transition">Join Queue</button>
               </div>
        </div>
    )
};

export default DoctorCard;