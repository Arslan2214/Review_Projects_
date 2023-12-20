import React from 'react'
import 'react-toastify/dist/ReactToastify.css';
import './App.css'

import { ToastContainer } from 'react-toastify'
import Router from './pages/Router';
import SideBar from './components/SideBar';

const App = () => {
  return (
    <>
      <ToastContainer />
      <main className='relative flex justify-center items-center w-[100vw] h-[100vh]'>
        <SideBar />
        <Router />
      </main>
    </>
  )
}

export default App