import type { Review, Book, Member}  from './components/types'
import Home from './Pages/Home';
import UsersList from './Pages/UsersList';
import UserProfile from './Pages/UserProfile';
import { ToastContainer } from 'react-toastify';
import { useState } from 'react'
import { Routes, Route } from 'react-router';
import './App.css'

function App() {
  return (
    <>
    <ToastContainer /> 
    <Routes>
      <Route path='/' element={<Home />} />
      <Route path='/userlist' element={<UsersList />}/>
      <Route path='/userprofile' element={<UserProfile />}/>
    </Routes>

    </>
  )
}

export default App
