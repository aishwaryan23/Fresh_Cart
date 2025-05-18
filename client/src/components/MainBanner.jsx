import React from 'react';
import { assets } from '../assets/assets';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

export const MainBanner = () => {
  return (
    <div className='relative'>
      <img src={assets.banner} alt={assets.main_banner_bg} className='hidden md:block w-full w-1200 h-150 object-cover' />
      <img src={assets.main_banner_bg_sm} alt={assets.main_banner_bg_sm} className='w-full md:hidden' />

      <div className='absolute inset-0 flex flex-col items-center md:items-start justify-end md:justify-center pb-24 md:pb-0 px-4 md:pl-18 lg:pl-24'>
        
        {/* Animated Heading */}
        <motion.h1
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ type: 'spring', stiffness: 90, damping: 5 }}
          className='text-black md:text-white text-3xl md:text-4xl lg:text-5xl font-bold text-center md:text-left max-w-72 md:max-w-80 lg:max-w-105 leading-tight lg:leading-15'
        >
          Shop Fresh, Save More, Live Better!
        </motion.h1>

        {/* Animated Button Group */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.8 }}
          className='flex items-center mt-6 font-medium'
        >
          <Link to={'/products'} className='group flex items-center gap-2 px-7 md:px-9 py-3 bg-primary hover:bg-primary-dull transition rounded text-white cursor-pointer'>
            Shop Now
            <img className='md:hidden transition group-focus:translate-x-1' src={assets.white_arrow_icon} alt="arrow" />
          </Link>

          <Link to={'/products'} className='text-white group hidden md:flex items-center gap-2 px-9 py-3'>
            Explore Deals
            <img className='text-white transition group-hover:translate-x-1' src={assets.white_arrow_icon} alt="arrow" />
          </Link>
        </motion.div>
      </div>
    </div>
  );
};

export default MainBanner;
