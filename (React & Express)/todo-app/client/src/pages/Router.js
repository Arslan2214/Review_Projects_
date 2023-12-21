import React from 'react'
import { Route, Routes } from 'react-router-dom'

import Frontend from './frontend'
import Auth from './auth'

const Router = () => {
  return (
    <>
    <Routes>
        <Route path="/" element={<Frontend/>}/>
        <Route path="/auth/*" element={<Auth/>}/>
    </Routes>
    </>
  )
}

export default Router