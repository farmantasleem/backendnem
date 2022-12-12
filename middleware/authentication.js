const jwt=require("jsonwebtoken");
const authentication=async(req,res,next)=>{
    const token=req.headers?.authorization?.split(" ")[1];
    if(token){
        const decoded=jwt.verify(token,process.env.JWT_SECRET);
        if(decoded){
            const userID=decoded.id;
            req.body.userid=userID;
            next()
        }else{
            res.status(404).send({"msg":"token isn't valid"})
        }

    }else{
        res.status(404).send({"msg":"token not found"})
    }
}

module.exports={authentication}