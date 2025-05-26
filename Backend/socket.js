const {Server} = require("socket.io");
const cors = require("cors");

let io;

const setupSocket = (server)=>{
    io = new Server(server,{
        cors:{
            origin: "http://localhost:5173",
            methods: ["GET", "POST", "PATCH"],
            credentials: true,
        },
    });

    io.on("connection", (socket)=>{
        console.log("New client connected");

        socket.on("join-room", (doctorId)=>{
            socket.join(doctorId);
            console.log(`Client joined roon: ${doctorId}`);
        });
        socket.on("disconnect", ()=>{
            console.log("Client disconnected");
        });
    });
};

module.exports = {setupSocket, getIO: ()=>io};