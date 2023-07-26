import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Home from './../Pages/Home'
import MainLayout from '../Components/Layouts/MainLayout'

const Router = () => {

    const RouteWithLayout = ({Element}) => {
        return(
            <MainLayout>
                <Element/>
            </MainLayout>
        )
    }
  return (
    <div>
        <Routes>
            <Route path="/" element={<RouteWithLayout Element={Home}/>} />
        </Routes>
    </div>
  )
}

export default Router