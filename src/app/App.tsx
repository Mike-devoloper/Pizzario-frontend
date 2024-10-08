import { Button, Typography } from '@mui/material';
import { Box, Container, Stack } from '@mui/system';
import React from 'react';
import { Link, Route, Switch, useLocation } from 'react-router-dom';
import { HomePage } from './screen/homePage';
import { ProductsPage } from './screen/productsPage';
import { UserPage } from './screen/userPage';
import { OrderPage } from './screen/ordersPage';
import { HomeNavbar } from './components/headers/HomeNavbar';
import { OtherNavbar } from './components/headers/OtherNavbar';
import { Footer } from './components/headers/footer';
import '../css/app.css';
import '../css/navbar.css';


function App() {
  const location = useLocation();
  
  return <>
  {location.pathname === "/" ? <HomeNavbar/> : <OtherNavbar/>}
  <Switch>
    <Route path="/products">
      <ProductsPage />
    </Route>
    <Route path="/member-page">
      <UserPage />
    </Route>
    <Route path="/orders">
      <OrderPage />
    </Route>
    <Route path="/">
      <HomePage/>
    </Route>
  </Switch>
  <Footer/>
</>
}



export default App;
