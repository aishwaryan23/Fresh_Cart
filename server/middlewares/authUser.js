import jwt from "jsonwebtoken";

export const authUser = async (req, res, next) =>{
    const token = req.cookies.token;

    if(!token){
        return res.json({success:false,message:"Not Authorized"});
    }

    try{
        const tokenDecode = jwt.verify(token, process.env.JWT_SECRET)
        if(tokenDecode.id){
            if(!req.body) req.body={}
            req.body.userId = tokenDecode.id;
        } else{
            return res.json({success:false,message:"Not Authorized"});
        }
        next()
    } catch(error){
        return res.json({success:false,message:error.message});
    }
}

export default authUser;