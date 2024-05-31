import React from 'react';

import { IoCalendarOutline } from "react-icons/io5";

const Navbar = () => {
    return <React.Fragment>
        <div className='py-3 px-5 md:px-12 lg:px-20 border border-gray-200'>
          <span className='flex items-center gap-2 text-gray-800'>
          <IoCalendarOutline size={20} />
          <h1 className='text-md'>Scheduling</h1>
          </span>
        </div>
    </React.Fragment>
}

export default Navbar