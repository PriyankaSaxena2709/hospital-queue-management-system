const {Router} = require("express");
const Patient = require("../models/Patient");
const Doctor = require("../models/doctor");
const Queue = require("../models/queue");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const {JWT_Secret} = require("../config");
const patientMiddleware = require("../middleware/patient");
const router = Router();


router.post('/signup', async(req,res)=>{
   const {name, email, medicalID, password} = req.body;
   
   //data validation
   if(!name|| !email || !password){
    return res.status(400).json({msg: "All fields are required"});
   }
    
   let existingUser = await Patient.findOne({email});
   if(existingUser){
    return res.status(400).json({msg: "Email already exist"});
   }
   const hashPassword = await 
   bcrypt.hash(password, 10);

   try{
     await Patient.create({
        name,
        email,
        medicalID,
        password : hashPassword
    })
    res.json({
        msg : "User created successfully"
    })
   }catch(err){
    res.status(500),json({
        err
    })
   }
});

router.post('/signin', async(req,res)=>{
    try{
        const{email, password} = req.body;

        if(!email || !password){
            return res.status(400).json({msg: "Fields are required"});
        }
        const userExist = await Patient.findOne({email});
        // console.log(userExist);
        if(!userExist){
            return res.status(400).json({msg: "Invalid ID and password"});
        }
        const isPasswordMatch = await bcrypt.compare(password, userExist.password );
        if(!isPasswordMatch){
            return res.status(400).json({msg: "Not correct password"});
        }
        const token = jwt.sign({email}, process.env.JWT_SECRET);
        res.status(200).json({
            msg: "Login Successful",
            token
        });
    }catch(err){
        res.status(500).json({msg: "Server error during patient login", err: err.message});
    }
});

router.post('/join-queue',patientMiddleware, async(req,res)=>{
    try{
        const {doctorId} = req.body;
        const userEmail = req.email;
        // console.log(userEmail);

        const patient = await Patient.findOne({email: userEmail});
        // console.log(patient);
        if(!patient){
            return res.status(400).json({msg: "Patient not found"});
        }
       
        const doctor = await Doctor.findOne({ _id: doctorId});
        // console.log(doctor);
        if(!doctor){
            return res.status(404).json({msg: "Invalid doctor"});
        }
    

        const existingInQueue = await Queue.findOne({patient: patient._id, doctor: doctor._id, status: "Not Attended"})
        // console.log(existingInQueue);
        if(existingInQueue){
            return res.status(400).json({msg: "You are already in the queue"});
        }

       
        const lastToken = await Queue.find({doctor: doctor._id}).sort({tokenNumber : -1}).limit(1);
        const nextToken = lastToken.length>0 ? lastToken[0].tokenNumber + 1 : 1;

        await Queue.create({
            patient: patient._id,
            doctor: doctor._id,
            tokenNumber: nextToken,
            department: doctor.department,
            status: "Not Attended"
        });
        res.status(200).json({
            msg: "Joined the queue",
            tokenNumber: nextToken,
            doctor: doctor._id,
            department: doctor.department,
            name: doctor.name
        
        });

    }catch(error){
        console.log("Join queue error", error);
        res.status(500).json({msg: "Server Error in patient route"});
        
    }
});

router.get('/queue', patientMiddleware, async(req,res)=>{
    try{
        const userEmail = req.email;

        const patient = await Patient.findOne({email: userEmail});
        if(!patient){
            return res.status(404).json({msg:"Patient not found"});
        }

        const queue = await Queue.findOne({ patient: patient._id, status: "Not Attended"}).populate("patient", "name").populate("doctor", "_id name");

        if(!queue){
            return res.status(200).json({queue: null});
        }
        res.status(200).json({
            queue:{
                patientName: queue.patient.name,
                department: queue.department,
                tokenNumber: queue.tokenNumber,
                doctor: queue.doctor._id,
                doctorName: queue.doctor.name,
                status: queue.status
            },
        });
    }catch(error){
        console.log("Error fetch patient queue", error);
        res.status(500).json({msg: "Server error while fetching queue"});
    }
});


module.exports = router;