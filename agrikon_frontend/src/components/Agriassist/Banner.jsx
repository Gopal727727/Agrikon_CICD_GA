import React from 'react'
import { Link } from 'react-router-dom'
import { useLocation } from 'react-router-dom'

const Banner = ({heading,description}) => {
  const location = useLocation();
  const currentPath = location.pathname.replace('/', '');
  return (
    <>
    <hr className='text-dark' style={{marginTop: "-2%"}} />
         <div
        className="bg-image text-center text-white py-5"
        style={{
          backgroundImage: "url('weatherpage.png')", 
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <p>  <Link to="/" className="text-white" style={{textDecoration:'none'}}>Home</Link> &gt; {heading} &gt; {currentPath} </p>
        <h1 className="fw-bold">{heading}</h1>
        <p className="text-white">{description}</p>
      </div>
    </>
  )
}

export default Banner