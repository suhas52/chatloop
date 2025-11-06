import { useState } from 'react'
import './App.css'
import ResponsiveAppBar from './components/navbar'
import { Route, Routes } from 'react-router-dom'
import LoginPage from './components/login'
import RegisterPage from './components/register'
import Home from './components/home'



function App() {
  
  return (
    <>
    <ResponsiveAppBar />
    <Routes>
    <Route path='/' element={<Home />} />
    <Route path="/login" element={<LoginPage />} />
    <Route path="/register" element={<RegisterPage />} />
    </Routes>
    </>
  )
}

export default App
