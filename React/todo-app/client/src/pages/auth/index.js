import React from 'react'
import { Route, Routes } from 'react-router-dom'

import SignIn from './SignIn'
import SignUp from './SignUp'

const Index = () => {
    return (
        <>
            <Routes>
                <Route path="/signIn" element={<SignIn />} />
                <Route path="/signUp" element={<SignUp />} />
            </Routes>
        </>
    )
}

export default Index