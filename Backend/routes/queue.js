const {Router} = require("express");
const Queue = require("../models/queue");
const {getIO} = require("../socket");
const router = Router();

router.patch('/mark-attended/:id', async(req,res)=>{
    const queueId = req.params.id;

    try{
        const updatedQueue = await Queue.findByIdAndUpdate(
            queueId,
            {status: "Attended"},
            {new: true}
        );
        // console.log(updatedQueue);

        const io = getIO();
        const doctorRoom = updatedQueue.doctor.toString();
        io.to(doctorRoom).emit("update-queue", {
            doctorId: doctorRoom,
            nowServingToken: updatedQueue.tokenNumber
        });

        if(!updatedQueue){
            return res.status(404).json({message : "Queue entry not found"});
        }
        res.status(200).json(updatedQueue);
    }catch(error){
        console.log("Error updating queue stauts", error);
        res.status(500).json({message: "Server error"});
    }
});

module.exports = router;