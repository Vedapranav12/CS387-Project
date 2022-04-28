import './App.css';
import React from 'react';
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";

import Home from './components/Home';
import ListMenu from './components/ListMenu';
import Register from './components/Register';
import Login from './components/Login';
import DeliveryManager from './components/DeliveryManager/DeliveryManager';
import DeliveryManagerListPersons from './components/DeliveryManager/DeliveryManagerListPersons';


function App() {
  return (
    <BrowserRouter>
      <div>
        <Routes>
          <Route path="/" element={<Home />} />

          <Route path="/login" element={<Login />} />
          <Route path="/menu" element={<ListMenu />} />
          <Route path="/register" element={<Register />} />
          <Route path="/deli_manager" element={<DeliveryManager />} />
          <Route path="/deli_manager/:pincode" element={<DeliveryManagerListPersons />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
