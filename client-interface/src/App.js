import './App.css';
import React from 'react';
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";

import Home from './components/Home';
import ListMenu from './components/ListMenu';
import ListUserCart from './components/ListUserCart';
import Register from './components/Register';
import Login from './components/Login';
import DeliveryManager from './components/DeliveryManager/DeliveryManager';
import DeliveryManagerListPersons from './components/DeliveryManager/DeliveryManagerListPersons';
import Header from './components/Header';
import GlobalContext from './providers/GlobalContext';
import GlobalContextProvider from './providers/GlobalContextProvider';

function App() {
  return (
    <div>
      <GlobalContextProvider>
        <BrowserRouter>
          <Header />
          <div>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/login" element={<Login />} />
              <Route path="/menu" element={<ListMenu />} />
              <Route path="/register" element={<Register />} />
              <Route path="/user_cart" element={<ListUserCart />} />
              {/* <Route path="/deli_manager" element={<DeliveryManager />} />
          <Route path="/deli_manager/:pincode" element={<DeliveryManagerListPersons />} /> */}
            </Routes>
          </div>
        </BrowserRouter>
      </GlobalContextProvider>
    </div>
  );
}

export default App;
