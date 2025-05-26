import React from "react";
import { useState } from "react";
import { NavLink } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../Context/AuthContext";



const DoctorLogin=()=>{
  const { login } = useAuth();
    const [formData, setformData] = useState({
        ID: '',
        password: '',
    });

    const navigate = useNavigate();

    function handleChange(event){
       setformData({...formData, [event.target.name]: event.target.value});
    }

    const handleSubmit= async(event)=>{
     event.preventDefault();
     try{
      const response = await fetch(`http://localhost:5000/doctor/signin`,{
        method: "POST",
        headers:{
          "Content-Type" : "application/json",
        },
        body: JSON.stringify(formData),
      });
      if(response.ok){
        alert("Login Successful");
        const data = await response.json();
        localStorage.setItem("token", data.token);
        login();
        
        setformData({
          ID: "",
          password: ""
        });
        navigate("/doctor");
      }else{
        const errorData = await response.json();
        alert(errorData.msg || "An error occurred");
      }
     }catch(error){
      alert(error.message);
     }
    }
    
    return(
     <div className="min-h-screen flex justify-center py-10">
        <div className="w-[500px] h-[500px] p-10 rounded-lg shadow-lg bg-blue-200">
            <h2 className=" text-[35px] py-2 mb-4 font-semibold text-gray-500 flex justify-center">Doctor Login</h2>
            <form className="space-y-5" onSubmit={handleSubmit}>
            <input 
            type="text"
            placeholder="Enter your ID"
            name="ID"
            value={formData.ID}
            onChange={handleChange}
            className="w-full bg-white px-4 py-4 rounded-md font-bold"
            />
            <input 
             type="password"
             placeholder="Password"
             name="password"
             value={formData.password}
             onChange={handleChange}
             className="w-full bg-white px-4 py-4 rounded-md font-bold"
             
            />
            <button className= "w-full flex justify-center bg-blue-900 text-white font-semibold px-6 py-3 rounded-full shadow-lg hover:bg-blue-700 transition">
              Submit
            </button>

            {/* <select
             name="role"
             value={formData.role}
             onChange={handleChange}
             className="w-full bg-white px-4 py-4 rounded-md font-bold"
            >
            <option value="">Select Role</option>
            <option value="patient">Patient</option>
            <option value="doctor">Doctor</option>
            </select> */}
            <h4 className="text-[20px] w-full flex justify-center font-semibold text-gray-600">Don't have an account? <NavLink to="/register/doctor">Register</NavLink></h4>
          </form>
        </div>
     </div>
    );
};

export default DoctorLogin;