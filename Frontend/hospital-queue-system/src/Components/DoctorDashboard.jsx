import React from "react";
import { useState, useEffect} from "react";

const DoctorDashboard = () => {
  // 
  const[queue, setQueue] = useState([]);
  console.log(queue);

  useEffect(()=>{
    const fetchPatient = async()=>{
      try{
        const token = localStorage.getItem("token");
        const response = await fetch(`http://localhost:5000/doctor/queue`, {
          headers:{
            Authorization: token,
          },
        });
        const data = await response.json();
        console.log(data.queue);
        setQueue(data.queue);
      }catch(error){
        console.log("Error fetching patient queue details", error);
      }
    };
    fetchPatient();
  },[]);

  const handleAttended = async(id)=>{
     try{
      const res = await fetch(`http://localhost:5000/queue/mark-attended/${id}`,{
        method: "PATCH",
        headers: {
          "Content-Type": "application/json"
        },
      });
      if(res.ok){
        const data = await res.json();
        setQueue((prevQueue)=> prevQueue.map((entry)=>entry._id === id ? {...entry, status: "Attended"}: entry));
      }
     }catch(error){
      console.log("Failed to mark attended", error);
     }
  }

  const totalPatient = queue.length;
  const waitingPatient = queue.filter(entry =>entry.status === "Not Attended").length;
  const completedPatient = queue.filter(entry =>entry.status === "Attended").length;

  return (
    <div className="p-8 bg-gray-100 min-h-screen">
      {/* Stats */}
      <div className="grid grid-cols-3 gap-6 mb-8">
        <div className="bg-white p-6 rounded-xl shadow text-center">
          <p className="text-2xl font-bold text-blue-700">{totalPatient}</p>
          <p className="text-gray-500">Total Patients</p>
        </div>
        <div className="bg-white p-6 rounded-xl shadow text-center">
          <p className="text-2xl font-bold text-yellow-500">{waitingPatient}</p>
          <p className="text-gray-500">Waiting</p>
        </div>
        <div className="bg-white p-6 rounded-xl shadow text-center">
          <p className="text-2xl font-bold text-green-600">{completedPatient}</p>
          <p className="text-gray-500">Completed</p>
        </div>
      </div>

      {/* Table Heading */}
      <h2 className="text-xl font-bold text-gray-800 mb-4">Waiting List</h2>

      {/* Table */}
      <div className="bg-white rounded-xl shadow overflow-x-auto">
        <table className="min-w-full text-sm">
          <thead className="bg-gray-50 text-left text-gray-600">
            <tr>
              <th className="p-4 ">Patient</th>
              <th className="p-4">Token Number</th>
              <th className="p-4">Waiting Time</th>
              <th className="p-4">Actions</th>
            </tr>
          </thead>
          <tbody>
            {queue.map((entry, index) => (
              <tr key={index} className="border-t">
                <td className="p-4 flex items-center gap-3 ">
                  {/* <img src={patient.img} alt="profile" className="w-10 h-10 rounded-full" /> */}
                  <span className="font-medium text-gray-800">{entry.patient.name}</span>
                </td>
                <td className="p-4">{entry.tokenNumber}</td>
                <td className="p-4">15 min</td>
                <td className="p-4">
                  <button onClick={()=>handleAttended(entry._id)} disabled={entry.status === 'Attended'} className={`px-4 py-1 rounded text-white ${
                      entry.status === 'Attended' ? 'bg-green-500 cursor-not-allowed' : 'bg-blue-500 hover:bg-blue-600'
                  }`}>
                    Attending
                  </button>
                  <button className="bg-blue-500 text-white px-4 py-1 rounded hover:bg-blue-600">
                    Not Attended
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
  };
  
  export default DoctorDashboard;
  