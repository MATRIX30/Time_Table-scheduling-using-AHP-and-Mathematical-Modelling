import React from 'react';

type InputSelectProps = {
    inputName: string;
    options: string[];
}

const InputSelect = ({inputName, options}:InputSelectProps) => {
    return <React.Fragment>
        <div className='flex flex-col'>
        <label htmlFor={inputName} className='text-sm text-gray-900'>{inputName}</label>
        <select className='w-full py-3 text-sm text-gray-500 border-2 border-gray-200 bg-gray-50 rounded-lg px-4 outline-none' id={inputName}>
         {options.map(option =>(<option value={option}>{option}</option>))}
       </select>
        </div>
    </React.Fragment>
}

export default InputSelect;