const mongoose = require("mongoose");

const DoctorSchema = new mongoose.Schema({
    name:{
        type: String,
        required: true,
    },
    ID:{
        type: String,
        required: true,
        unique: true
    },
    department:{
        type: String,
        required: true
    },
    days:{
        type: [String],
        required: true
    },
    password:{
        type: String,
        required: true
    }
});

const Doctor = mongoose.model('Doctor', DoctorSchema);

module.exports = Doctor;