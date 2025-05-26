const mongoose = require("mongoose");

const PatientSchema = new mongoose.Schema({
    name:{
        type: String,
        required: true,
    },
    email:{
        type: String,
        required: true,
    },
    medicalID:{
        type: String,
    },
    password:{
        type: String,
        required: true
    }
});

const Patient = mongoose.model('Patient', PatientSchema);

module.exports = Patient;