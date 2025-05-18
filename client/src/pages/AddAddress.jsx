import React from 'react'
import { assets } from '../assets/assets'
import { useState}  from 'react'
import { useAppContext } from '../context/AppContext'
import toast from 'react-hot-toast'
import {useEffect} from "react";

//Input Feild Component
const InputField = ({type,placeholder,name,handleChange,address}) => (
    <input className='w-full px-2 py-2.5 border border-gray-500/30 rounded outline-none  text-gray-500 focus:border-primary transition' 
    type={type}
    placeholder={placeholder}
    name={name}
    value={address[name]}
    onChange={handleChange}
    required
    />
)

export const AddAddress = () => {
    const {axios,user,navigate} = useAppContext();

    const [address, setAddress] = useState({
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
        street: "",
        city: "",
        state: "",
        country: "",
        zipcode: "",
    })

    const handleChange = (e) => {
        const {name, value} = e.target;
        setAddress((prevAddress)=>({
            ...prevAddress,
            [name]: value,
        }))
    }

    const onSubmitHandler = async(e) =>{
        try {
            const {data} = await axios.post('/api/address/add',address);
            if(data.success){
                toast.success(data.message);
                navigate("/cart");
            }else{
                toast.error(data.message)
            }
            }
         catch (error) {
            toast.success(error.message);
        }
    }

    useEffect(()=>{
        if(!user){
            navigate("/cart");
        }
        }
    ,[])
  return (
    <div className='mt-16 pb-16'>
      <p className='text-2xl md:text-3xl text-primary'>Add Shipping <span className='font-semibold text-primary'>Address</span></p>  
      <div className='flex flex-col-reverse md:flex-row justify-between mt-10'>
        <div className='flex-1 max-w-md'>
            <form onSubmit={onSubmitHandler} className='space-y-3 mt-6 text-sm '>
                <div className='grid grig-cols-2 gap-4 '>
                    <InputField handleChange={handleChange} address={address} name='firstName' type ="text" placeholder="First Name"/>
                    <InputField handleChange={handleChange} address={address} name='lastName' type ="text" placeholder="Last Name"/>
                </div>
                <InputField handleChange={handleChange} address={address} name='email' type ="email" placeholder="Email address"/>
                <InputField handleChange={handleChange} address={address} name='street' type ="etext" placeholder="Street"/>

                <div className='grid grid-cols-2 gap-4'>
                    <InputField handleChange={handleChange} address={address} name='city' type ="text" placeholder="City"/>
                    <InputField handleChange={handleChange} address={address} name='state' type ="text" placeholder="State"/>
                </div>

                <div className='grid grid-cols-2 gap-4'>
                    <InputField handleChange={handleChange} address={address} name='zipcode' type ="number" placeholder="Pin Code"/>
                    <InputField handleChange={handleChange} address={address} name='country' type ="text" placeholder="Country"/>
                </div>

                <InputField handleChange={handleChange} address={address} name='phone' type ="number" placeholder="Phone Number"/>

                <button type='submit' className='w-full mt-6 bg-primary text-white py-3 hover:bg-primary-dull transition cursor-pointer uppercase'>
                    Save Address
                </button>
            </form>

        </div>
        <img className='md:ml-10 md-16 md:mt-0 md:mb-16   transition duration-500 rounded-xl w-100 h-100' src={assets.delivery_boy} alt="address"/>
      </div>
    </div>
  )
}

export default AddAddress