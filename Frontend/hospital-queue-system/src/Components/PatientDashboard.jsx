import React, { useEffect, useState } from "react";
import io from "socket.io-client";

const socket = io("http://localhost:5000");

const PatientDashboard = () => {
  const [appointment, setAppointment] = useState(null);
  const [nowServing, setNowServing] = useState(null);
  const [waitTime, setWaitTime] = useState(null);
  const [isTurnNear, setIsTurnNear] = useState(false);
  console.log(appointment);

  useEffect(() => {
    const fetchAppointment = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await fetch(`http://localhost:5000/patient/queue`, {
          headers: {
            Authorization: `${token}`,
          },
        });
        if (response.ok) {
          const data = await response.json();
          setAppointment(data.queue);

          if(data.queue.doctor){
            socket.emit("join-room", data.queue.doctor);
          }
        } else {
          console.error("Failed to fetch appointment");
        }
      } catch (error) {
        console.log("Error fetching appointment", error);
      }
    };
    fetchAppointment();

    // return()=>{
    //   socket.disconnect();
    // };
  }, []);

  useEffect(()=>{
    socket.on("update-queue", (payload)=>{
      const{doctorId, nowServingToken} = payload;
      setNowServing(nowServingToken);

      if(appointment){
        const myToken = appointment.tokenNumber;
        const remaining = myToken - nowServingToken;
        setWaitTime(`${remaining * 15} min`);

        setIsTurnNear(remaining === 1);
      }
    })
  })

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      {appointment ?(
        <>
        <h1 className="text-2xl font-bold mb-6 text-center"><span>Hello,{appointment.patientName} </span></h1>
        <div className="grid grid-cols-3 gap-6 mb-8">
          <div className="bg-blue-600 p-6 rounded-xl shadow text-center">
            <p className="text-4xl font-bold text-white">{appointment.tokenNumber}</p>
            <p className="text-white">Token Number</p>
          </div>
          <div className="bg-white p-6 rounded-xl shadow text-center">
            <p className="text-4xl font-bold text-gray-700">{nowServing !== null ? nowServing : "Loading..."}</p>
            <p className="text-gray-500">Now Serving</p>
          </div>
          <div className="bg-blue-600 p-6 rounded-xl shadow text-center">
            <p className="text-4xl font-bold text-white">{waitTime ? waitTime : "--"}</p>
            <p className="text-white">Estimated Wait Time</p>

          </div>
        </div>
        {isTurnNear && (
            <div className="text-center mb-6 text-orange-600 font-bold text-3xl">
              🚨 Your turn is about to come. Please be ready.
            </div>
          )}

        <div className="bg-white p-10 rounded-xl shadow mt-14">
          <h2 className="text-2xl font-bold mb-4 text-center mb-10">Queue Information</h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-center">
            <div>
              <p className="text-xl text-gray-500 mb-4">Department</p>
              <p className="font-medium">{appointment.department}</p>
            </div>
            <div>
              <p className="text-xl text-gray-500 mb-4">Doctor Name</p>
              <p className="font-medium">{appointment.doctorName}</p>
            </div>
            <div>
              <p className="text-xl text-gray-500 mb-4">Token Number</p>
              <p className="font-medium">{appointment.tokenNumber}</p>
            </div>
          </div>
        </div>
      </>
      ) : (
        <div className="text-center text-gray-600 mt-10">
          <p>No active appointments found.</p>
        </div>
      )}
      
    </div>
  );
};

export default PatientDashboard;
