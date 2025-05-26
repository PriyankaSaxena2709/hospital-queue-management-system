const jwt = require("jsonwebtoken");
const {JWT_Secret} = require("../config");

function patientMiddleware(req,res,next){
    const token = req.header("Authorization");
    // console.log(token);
    try{
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const username = decoded.email;
        if(username){
            req.email = username;
            next();
        }
        else{
            res.status(403).json({
                msg: "You are not logedin"
            })
        }
    }catch(error){
        res.json({
            error,
            msg: "Invalid token"
        })
    }
}

module.exports = patientMiddleware;