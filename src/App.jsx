import React, { useEffect } from 'react'
import Header from './site/layouts/Header'
import Home from './site/pages/home/Home'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import  Posts  from './site/pages/posts/Posts'
import Footer from './site/layouts/Footer'
import SinglePost from './site/pages/SinglePost'
import MainLayout from './layouts/MainLayout'
import ToastProvider from './site/components/ToastProvider'
import useAuthStore from './store/AuthStore'

function App() {
  const checkislogin = useAuthStore((state) => state.checkislogin)
  useEffect(() => {
    checkislogin();
  }, [])
  return (
    <BrowserRouter>
      <ToastProvider />
      <MainLayout />
    </BrowserRouter>
  )
}

export default App