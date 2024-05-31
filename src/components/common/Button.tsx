import React from 'react'

type ButtonProps = {
    onClick?: () => void;
    children: React.ReactNode;
}

const Button = ({onClick, children}:ButtonProps) => {
    return <React.Fragment>
        <button onClick={onClick} className='px-12 py-3 rounded-md bg-gray-800 text-sm text-white md:hover:bg-gray-600 transition-all'>{children}</button>
    </React.Fragment>
}

export default Button