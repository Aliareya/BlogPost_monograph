import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Home from '../site/pages/home/Home'
import {Posts} from '../site/pages/Posts'
import About from '../site/pages/About'
import Contact from '../site/pages/Contact'
import SinglePost from '../site/pages/SinglePost'
import Signup from '../auth/Signup';
import {Login} from "../auth/Login"

function WebRoutes() {
  return (
    <Routes>
      <Route path='/' element={<Home/>}/>
      <Route path='/posts' element={<Posts/>}/>
      <Route path='/posts/:id' element={<SinglePost/>}/>
      <Route path='/about' element={<About/>}/>
      <Route path='/contact' element={<Contact/>}/>
      <Route path='/register' element={<Signup/>}/>
      <Route path='/login' element={<Login/>}/>
    </Routes>
  )
}

export default WebRoutes