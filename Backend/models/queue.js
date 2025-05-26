const mongoose = require('mongoose');

const queueSchema = new mongoose.Schema({
    patient:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Patient',
        required: true
    },
    doctor:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Doctor',
        required: true
    },
    department:{
        type: String,
        required: true,
    },
    tokenNumber: {
        type: Number,
        required: true,
    },
    status:{
        type: String,
        enum:['Attended', 'Not Attended'],
        default: 'Not Attended'
    }
});

const Queue = mongoose.model('Queue', queueSchema);
module.exports = Queue;