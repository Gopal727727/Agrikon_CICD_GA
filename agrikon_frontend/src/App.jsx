import Navbar from './components/navbar'
import Navbartop from './components/navbartop'
import Welcome from './components/Welcome'
import CropIssueFinder from './components/Cropissuefinder'
import './App.css'
import Agricultureimportance from './components/Agricultureimportance'
import Onhold from './components/Onhold'
import BestCrop from './components/Bestcrop'
import Feedback from './components/Feedback'
import Gallery from './components/Gallery'
import Footer from './components/Footer'
import Customerfeedback from './components/Customerfeedback'




function App() {
  return (
    <>
      <Navbartop />
      <div className='root-content'>
        <div className="contents">
          <Navbar />
          <Welcome />
          <Agricultureimportance />
        </div>
        {/* <BestCrop /> */}
        <Gallery />
        <Feedback />
        <Customerfeedback/>
      </div>
      
      <Footer/>
      
    </>
  )
}

export default App
