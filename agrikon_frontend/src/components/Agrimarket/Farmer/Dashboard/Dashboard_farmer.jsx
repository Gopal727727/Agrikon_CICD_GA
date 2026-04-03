import React, { useEffect, useState } from 'react'
import Sidebar from './Sidebar'
import Dashboardnav from './Dashboardnav'
import Dashboardcontent from './Dashboardcontent'
import ProfileFarmer from './Profile_farmer'
import axios from 'axios'
function Dashboard_farmer() {
  
  return (


    <div style={{ backgroundColor: 'aliceblue', height: '100vh' }} >
    
      <Dashboardnav />
      <Sidebar  />
      <Dashboardcontent />
    </div>

  )
}

export default Dashboard_farmer