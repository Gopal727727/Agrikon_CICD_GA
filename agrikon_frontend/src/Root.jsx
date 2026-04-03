import React from 'react'
import { Outlet } from 'react-router-dom'
import Navbar from './components/navbar'
import Navbartop from './components/navbartop'
import Footer from './components/Footer'
import './App.css';
import { Provider } from 'react-redux'
import { store } from './Store/Store'

const Root = () => {
  return (
    <>
   
<Provider store={store}>
    <Navbartop/>
    <Navbar className='navbar-root'/>
    <Outlet/>
    <Footer/>
    </Provider>
    
    </>
  )
}

export default Root
