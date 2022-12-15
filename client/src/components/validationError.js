import React from 'react'


const ValidationError = ({message}) => {
    return (
        <div className='transition-opacity-100 text-center text-xl text-red-500 p-2'>
            {message}
        </div>
    )
}

export default ValidationError