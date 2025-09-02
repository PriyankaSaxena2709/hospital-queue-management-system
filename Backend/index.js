require("dotenv").config();
const express = require("express");
const app = express();
const cors = require("cors");
const connectDb = require("./db/db");
const http = require("http");
const {setupSocket} = require("./socket");
const patientRouter = require("./routes/patient");
const doctorRouter = require("./routes/doctor");
const queueRouter = require("./routes/queue");

// const corsOptions ={
//     origin: "http://localhost:5173",
//     methods: "GET, POST, PUT, PATCH, DELETE, HEAD",
//     credentials: true
// };
// app.use(cors(corsOptions));
const allowedOrigins = [
  "http://localhost:5173",
  "https://hospital-queue-management-system-rosy.vercel.app/" 
];

const corsOptions = {
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  methods: "GET, POST, PUT, PATCH, DELETE, HEAD",
  credentials: true
};

app.use(cors(corsOptions));



app.use(express.json());
app.use("/patient", patientRouter);
app.use("/doctor", doctorRouter);
app.use("/queue", queueRouter);

const server = http.createServer(app);
setupSocket(server);
 
const PORT = process.env.PORT || 5000;
connectDb().then(()=>{
    server.listen(PORT, ()=>{
    console.log(`Server is running on port ${PORT}`)
  });
});