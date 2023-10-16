// import { useState } from 'react';

import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css';

import Home from './component/home/Home';
import ProductDetail from './component/product/productDetail';
import { Box } from '@mui/material';


export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route exact path='/' element={< Home />}/>
        <Route exact path='/product/:productId' element={< ProductDetail />}/>
      </Routes>
    </BrowserRouter>
  )
}

