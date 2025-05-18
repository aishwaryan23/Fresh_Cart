import mongoose from 'mongoose';

const connectDB = async () =>{
    try{
        mongoose.connection.on('connected', ()=> console.log('database Connected'));
        await mongoose.connect(`${process.env.MONGODB_URI}/freshcart`)
    } catch(error){
        console.log(error.message);
        
    }
}

export default connectDB;