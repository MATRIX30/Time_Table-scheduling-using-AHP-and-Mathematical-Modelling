import { Button, InputSelect } from '@/components/common';
import Navbar from '@/components/layout/Navbar';
import { inputSelectElement } from '@/data/dummy-data';
import React from 'react';

// import { Navbar } from '../../components/layout';
import { IoCalendarOutline } from "react-icons/io5";
// import { Button, InputSelect } from '../../components/common';
// import { inputSelectElement } from '../../data/dummy-data';
import { LuDownload } from "react-icons/lu";

const GeneratingPage = () => {
 return (
   <React.Fragment>
     <Navbar/>
     <div className='md:h-[500px] flex flex-col lg:flex-row gap-12 p-5 md:px-20 md:py-12'>
      {/* form */}
      <form className='h-full w-full lg:w-1/2'>
          <h1 className='text-lg text-gray-800'>Timetable Scheduling System</h1>
          <p className='text-sm text-gray-400 md:max-w-xl'>Easily generate your class timetables in an optimal way with this tool designed using the AHP (Analytical Hierachical processing) method</p>
          <div className='flex flex-col gap-4 md:w-2/3 pt-5'>
            {inputSelectElement.map(elt => (<InputSelect key={elt.name} inputName={elt.name} options={elt.options}/>))}
            <Button>Generate</Button>
          </div>
          
      </form>
      {/* Generating space */}
      <div className='relative h-56 md:h-96 lg:h-full w-full md:w-2/3 lg:w-1/2 flex flex-col justify-center border-2 border-dashed border-gray-300 rounded-lg'>
           <div className='flex justify-end absolute top-2 right-3 w-full'>
             <button className='text-gray-400 p-2 rounded-lg md:hover:bg-gray-100'><LuDownload size={24}/></button>
           </div>
           <div className='flex flex-col items-center text-gray-400'>
           <IoCalendarOutline size={30} />
           <p className='text-md text-center'>Timetable generation space</p>
           </div>
      </div>
     </div>
   </React.Fragment>
 )
}

export default GeneratingPage;