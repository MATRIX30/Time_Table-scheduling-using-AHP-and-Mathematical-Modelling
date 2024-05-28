import React from 'react'

const Button = ({onClick, children}) => {
    return <React.Fragment>
        <button onClick={onClick} className='px-12 py-3 rounded-md bg-gray-800 text-sm text-white md:hover:bg-gray-600 transition-all'>{children}</button>
    </React.Fragment>
}

export default Button