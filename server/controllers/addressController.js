

// Add adress: /api/address/add

import Address from "../models/address.js"

export const addAddress = async (req, res) =>{
    try {
        const { userId} = req.body
        await Address.create({...req.body, userId})
        res.json({success:true,message:"Address added successfully" })
    } catch (error) {
        console.log(error)
        res.json({success:false,message:error.message})
    }
}

// get address : /api/address/get

export const getAddress = async(req,res)=>{
    try{
        const {userId}=req.body;
        const addresses = await Address.find({userId})
        res.json({success:true,addresses })
    }catch (error) {
        console.log(error)
        res.json({success:false,message:error.message})
    }
}