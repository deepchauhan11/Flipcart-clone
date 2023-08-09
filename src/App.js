// import { useState } from 'react';
import './App.css';
import Footer from './component/footer/Footer';
import SubFooter from './component/footer/SubFooter';
import Header from './component/header/Header';
import Home from './component/home/Home';
import { Box } from '@mui/material';

function App(){
  

  return (
    <div className="App">
      <Header />
      <Box style={{marginTop:17}}>
        <Home />
      </Box>
      <Footer/>
      <SubFooter/>
    </div>
  );
}

export default App;
