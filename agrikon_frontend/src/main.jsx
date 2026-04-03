import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import Weather from './components/Agriassist/Weather.jsx';
import 'bootstrap/dist/css/bootstrap.min.css';
import App from './App.jsx'
import Profile_farmer from './components/Agrimarket/Farmer/Dashboard/Profile_farmer.jsx';
import Mycropslisting from './components/Agrimarket/Farmer/Mycropslisting.jsx';
import CropRecommender from './components/Agriassist/CropRecomendder.jsx';
import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from 'react-router-dom';
import Root from './Root.jsx';
import Agriculturesupport from './components/Agriassist/Agriculturesupport.jsx';
import Biddingfield from './components/Agrimarket/Bussinessman/Biddingfield.jsx';
import Marketinformation from './components/Agrimarket/Marketinfo/Marketinformation.jsx';
import Login from './components/validate/Login.jsx';
import Protect from './components/validate/Protect.jsx';
import Check from './components/validate/Check.jsx';
import { Provider } from 'react-redux';
import { store } from './Store/Store.js';
import Dashboard_farmer from './components/Agrimarket/Farmer/Dashboard/Dashboard_farmer.jsx';
import SignUp from './components/validate/Signup.jsx';
import Forgotpassword from './components/validate/Forgetpassword.jsx';
import Resetpassword from './components/validate/Resetpassword.jsx';
import { ToastContainer} from 'react-toastify';

const user = localStorage.getItem("usertype")

const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path="/" element={<App />} />
      <Route path="/" element={<Root />}>
        <Route path="weather" element={<Weather />} />
        <Route path="CropReccomender" element={<CropRecommender />} />
        <Route path="AgriAssistance" element={<Agriculturesupport />} />
        <Route path="profilefarmer" element={<Profile_farmer />} />
        <Route path="marketinformation" element={<Marketinformation />} />
        <Route path="Signup" element={<SignUp />} />
        <Route path='forgetpassword' element={<Forgotpassword/>}/>
        <Route path='resetpassword' element={<Resetpassword/>}/>
        <Route path="login" element={<Login />} />
        <Route element={<Protect/>} >
           <Route path="check" element={<Check/>}/>
           <Route path="KrishiMarket" element={ user=="Farmer"?<Mycropslisting />:<Check/>} />
           <Route path="KrishiMarket_business" element={user=="Businessman"?<Biddingfield />:<Check/>} />
        </Route>
      </Route>
      <Route path="/farmer/Dashboard" element={<Dashboard_farmer />} />
    </>
  ),
  {
    basename: "/Agrikon_CICD_GA"
  }
);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={store}>
      <RouterProvider router={router}/>
      <ToastContainer/>
    </Provider>
  </StrictMode>
)