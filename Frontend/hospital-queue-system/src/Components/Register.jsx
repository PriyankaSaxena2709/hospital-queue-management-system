import React from "react";
import { useState } from "react";
import { Navigate, NavLink } from "react-router-dom";
import { useNavigate } from "react-router-dom";


//Patient Register Form

const Register=()=>{

  const [formData, setformData] = useState({
    name: '',
    email: '',
    medicalID: '',
    password: ''
  });
  
  const navigate = useNavigate();

  function handleChange(event){
    setformData({...formData, [event.target.name]: event.target.value});
  }

  const handleSubmit = async(event)=>{
     event.preventDefault();

     try{
      const response = await fetch(`https://hospital-queue-management-system-0jm3.onrender.com/patient/signup`,{
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(formData)
      });
      if(response.ok){
        alert("Registeration Successful");
        setformData({
          name: '',
          email: '',
          medicalID: '',
          password: ''
        });
        navigate("/login");
      }

     }catch(error){
      alert(error.message);
     }
  }

    return(
        <div className="min-h-screen flex justify-center py-10">
          <div className="w-[600px] h-[600px] p-10 rounded-lg shadow-lg bg-blue-200">
            <h2 className=" text-[35px] py-2 mb-4 font-semibold text-gray-500 flex justify-center">
              Create an account
            </h2>
          <form className="space-y-5" onSubmit={handleSubmit}>
            <input 
            type="text"
            placeholder="Enter your name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className=" w-full bg-white rounded-md px-4 py-4 font-bold "
            />
            <input 
            type="text"
            placeholder="Enter your email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="w-full bg-white px-4 py-4 rounded-md font-bold"
            />
            <input 
              type="text"
              placeholder="Medical ID (optional)"
              name="medicalID"
              value={formData.medicalID}
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
            <h4 className="text-[20px] w-full flex justify-center font-semibold text-gray-600">Already have an account ?<NavLink to="/login">Login</NavLink></h4>
          </form>
        </div>
      </div>
    );
};

export default Register;