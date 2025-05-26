const jwt = require("jsonwebtoken");
const {JWT_Secret} = require("../config");

function doctorMiddleware(req,res,next){
  const token = req.header("Authorization");
  try{
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const userID = decoded.ID;
    if(userID){
        req.ID = userID;
        next();
    }
    else{
        res.status(403).json({msg: "You are not logged in"})
    }
  }catch(error){
    res.json({
        error,
        msg:"Invalid Token"
    })
  }
}
module.exports = doctorMiddleware;