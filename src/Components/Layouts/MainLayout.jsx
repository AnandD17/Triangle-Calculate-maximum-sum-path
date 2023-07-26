import React from 'react'
import Topbar from '../Partials/Topbar'

const MainLayout = ({children}) => {
  return (
    <div className='min-h-screen'>
        <Topbar/>
        <div>
        {children}
        </div>
    </div>
  )
}

export default MainLayout