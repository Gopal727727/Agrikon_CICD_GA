import React from 'react'
import Banner from '../../Agriassist/Banner'
import Bidtable from './Bidtable'
function Biddingfield() {
  return (
    <div style={{backgroundColor:'#f0f8ff'}}>
        <Banner heading='Agri Market' description='Bid Smart, Grow Big – The Future of Crop Trading Starts Here' />
        <div  className='mt-4'> 
            <h2 className='text-center'>Bidding Field</h2>
            <Bidtable/>
        </div> 
    </div>
  )
}

export default Biddingfield