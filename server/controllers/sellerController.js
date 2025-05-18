//Seller login : api/seller/login
import jwt from "jsonwebtoken";

export const sellerLogin = async(req, res)=>{
    try {
        const {email,password} = req.body;

    if(password === process.env.SELLER_PASSWORD && email ==process.env.SELLER_EMAIL) {
        const token = jwt.sign({email},process.env.JWT_SECRET,{expiresIn:"7d"});

        res.cookie('sellerToken' , token, {
            httpOnly : true, //Prevent javascript to access cookie
            secure : process.env.NODE_ENV === 'production', //USE SECURE COOKIE IN PRODUCTION
            sameSite : process.env.NODE_ENV === 'production' ? 'none' : 'strict', //Prevent CSRF
            maxAge : 7 * 24 * 60 * 60 * 1000 //7 days
         });

         return res.json({
             success: true,
             message:'Logged in successfully'
         })
    } else{
        return res.json({success:false, message:'Invalid credentials'})
    }
    } catch (error) {
        console.log(error.message);
        res.json({success : false, message: error.message});
    }
}

// Seller is-auth : api/seller/is-auth

export const isSellerAuth = async (req,res)=>{
    try{
        
        return res.json({success:true});
    }catch(error){
        console.log(error.message);
        res.json({success : false, message: error.message});
    }
}

// seller logout : api/seller/logout

export const sellerLogout = async (req,res)=>{
    try{
        res.clearCookie("sellerToken",{
            httpOnly : true,
            secure : process.env.NODE_ENV === 'production',
            sameSite : process.env.NODE_ENV === 'production' ? 'none' : 'strict',
        });
        return res.status(200).json({success:true,message:'Logged out successfully'})
    }catch(error){
        console.log(error.message);
        res.json({success : false, message: error.message});
    }
}