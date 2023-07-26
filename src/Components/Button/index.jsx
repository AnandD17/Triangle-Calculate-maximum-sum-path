import React from 'react'

const index = ({children, handleClick}) => <button className='p-2 px-4 bg-blue-400 rounded-lg text-white text-center' onClick={handleClick}>{children}</button>
export default index