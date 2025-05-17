import './App.css';
import React from 'react';
import{Routes, Route} from 'react-router';
import Navbar from './components/Navbar';
import Home from './components/Home';
import About from './components/About';
import ContactUs from './components/ContactUs';
import Login from './components/Login';
import Partner from './components/Partner';
import Cart from './components/Cart';
import CheckOut from './components/CheckOut';
import MyAccount from './components/MyAccount';
import CreateRestaurant from './components/CreateRestaurant';
import AddProduct from './components/AddProduct';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Restaurants from './components/Restaurants';
import ShowProduct from './components/ShowProduct';
import Saveforlater from './components/Saveforlater';

function App() {
  return (
    <>
    <ToastContainer/>
    <Navbar/>
     <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/ContactUs" element={<ContactUs />} />
      <Route path="/Partner" element={<Partner />} />
      <Route path='/Cart' element={<Cart/>}/>
      <Route path='/checkout' element={<CheckOut/>}/>
      <Route path='/MyAccount' element={<MyAccount/> } />
      <Route path='/AddProduct/:id' element={<AddProduct/> } />
      <Route path='/CreateRestaurant' element={<CreateRestaurant/>} />
      <Route path='/Restaurants' element={<Restaurants/>} />
      {/* <Route path='/ShowProduct' element={<ShowProduct/>} /> */}
      <Route path="/ShowProduct/:id" element={<ShowProduct />} />
      <Route path='/Saveforlater' element={<Saveforlater/>} />
      <Route path="/login" element={<Login activeTab="login"/> } />
      <Route path="/register" element={<Login activeTab="Registor"/>} />
     </Routes>
     <About/>
    </>
  );
}

export default App;
