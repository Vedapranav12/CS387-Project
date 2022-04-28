import './App.css';
import React from 'react';
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";

import Home from './components/Home';
import Delivery_manager from './components/Delivery_manager';

function App() {
  return (
    <BrowserRouter>
      <div>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/delivery_manager" element={<Delivery_manager />}/>
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
