const {Router} = require("express");
const Doctor = require("../models/doctor");
const Queue = require("../models/queue");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const {JWT_Secret} = require("../config");
const doctorMiddleware = require("../middleware/doctor");
const router = Router();

router.post('/signup', async(req,res)=>{
try{
   const{name, ID, department, days, password} = req.body;
   
   //validation
   if(!name || !ID || !department || !password ){
    return res.status(400).json({msg: "Fields are required"});
   }

   const doctorExist = await Doctor.findOne({ID});
   if(doctorExist){
    return res.status(400).json({msg: "User already exists"});
   }
   const hashPassword = await bcrypt.hash(password, 10);

   await Doctor.create({
    name,
    ID,
    department,
    days,
    password : hashPassword
   })

   res.json({
    msg: "User created successfully"
   })

 }catch(err){
    res.status(500).json({
        err,
        msg: "Server error in doctor route"
    })
 }
});

router.post('/signin', async(req,res)=>{
 try{
    const{ID, password} = req.body;

    if(!ID || !password){
        return res.status(400).json({msg: "All fields are required"});
    }
    const userExist = await Doctor.findOne({ID});
    if(!userExist){
        return res.status(400).json({msg: "Invalid ID or password"});
    }

    const isPasswordMatch = await bcrypt.compare(password, userExist.password );
    if(!isPasswordMatch){
        return res.status(400).json({msg: "Incorrect password"});
    }

    const token = jwt.sign({ID}, process.env.JWT_SECRET);
    res.status(200).json({
        msg: "Login Successful",
        token
    })
 }catch(err){
    res.status(500).json({msg: "Server error in doctor route", err: err.message});
 }

});

router.get('/queue', doctorMiddleware, async(req,res)=>{
    try{
        const doctorID = req.ID;
        
        const doctor = await Doctor.findOne({ID : doctorID});
        // console.log(doctor);
        if(!doctor){
            return res.status(400).json({msg: "Doctor is not found"});
        }

        const queue = await Queue.find({ doctor : doctor._id , status: "Not Attended" }).populate('patient', 'name email').sort({tokenNumber: 1});
        console.log(queue);

        res.status(200).json({
            queue
        })
    }catch(error){
        console.log("Doctor queue view error", error);
        res.status(500).json({msg: "Server error while fetching queue in doctor"});
    }
});

router.get('/department', async(req,res)=>{
  try{
    const doctors = await Doctor.distinct("department");
    res.status(200).json(doctors);
  }catch(error){
    console.log("Failed to fetch doctor", error);
    res.status(500).json({msg: "Server error in fetching the doctor"});
  }
});

router.get('/:department', async(req,res)=>{
    const department = req.params.department.trim();
    try{
        const doctors = await Doctor.find({department : {$regex: new RegExp(`^${department}$`, "i")}});
        res.status(200).json(doctors);
        console.log(doctors);
    }catch(error){
       res.status(500).json({msg: "Server error while fetching doctors by department"});
    }
});

module.exports = router;