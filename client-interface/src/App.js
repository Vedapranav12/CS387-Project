import './App.css';
import React from 'react';
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";

import Home from './components/Home';
<<<<<<< HEAD
import Delivery_manager from './components/Delivery_manager';

=======
import ListMenu from './components/ListMenu';
import Register from './components/Register';
import Login from './components/Login';
import DeliveryManager from './components/DeliveryManager/DeliveryManager';
>>>>>>> 63046abb5284f2455f9c6df2050a9f06849453bd
function App() {
  return (
    <BrowserRouter>
      <div>
        <Routes>
          <Route path="/" element={<Home />} />
<<<<<<< HEAD
          <Route path="/delivery_manager" element={<Delivery_manager />}/>
=======
          <Route path="/login" element={<Login />} />
          <Route path="/menu" element={<ListMenu />} />
          <Route path="/register" element={<Register />} />
          <Route path="/deli_manager" element={<DeliveryManager />} />
          <Route path="/deli_manager/:pincode" element={<DeliveryManagerListPersons />} />
>>>>>>> 63046abb5284f2455f9c6df2050a9f06849453bd
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
