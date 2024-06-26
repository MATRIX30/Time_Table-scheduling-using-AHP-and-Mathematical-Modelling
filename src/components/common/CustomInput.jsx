// import React from 'react';

function CustomInput({ placeholder, icon, label, value, onChange, type }) {
  return (
    <div>
      {/* <label
        htmlFor={placeholder}
        className="block mb-2 text-xl font-medium text-black-900 dark:text-black"
      >
        {name}
      </label> */}
      <div className="flex flex-col">
        {label &&(  <label htmlFor={placeholder} className="text-gray-700 text-sm block mb-1">{label}</label>)}
        <div className="flex">
          <input
          id={placeholder}
          value={value}
          onChange={onChange}
          type={type}
          className="border-r-0 text-gray-900 w-full text-sm border-gray-300 p-2.5 bg-gray-200 placeholder-gray-400"
          placeholder={placeholder}
        />
      { icon &&( <span className="inline-flex items-center px-3 text-sm  border-l-0  rounded-md  bg-blue-500 text-white  border-red-600">
          {icon}
        </span>)}
        </div>
      </div>
    </div>
  );
}

export default CustomInput;
