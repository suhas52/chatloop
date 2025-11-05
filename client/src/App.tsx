import { useState } from 'react'
import './App.css'
import ResponsiveAppBar from './components/navbar'
import { Routes } from 'react-router-dom'
import Login from './components/login'


function App() {
  
  return (
    <>
    <ResponsiveAppBar />
    <Login />
    <Routes>
    
    </Routes>
    </>
  )
}

export default App
