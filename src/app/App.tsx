import { Button, Typography } from '@mui/material';
import { Box, Container, Stack } from '@mui/system';
import React, { useState } from 'react';
import { Link, Route, Switch, useLocation } from 'react-router-dom';
import HomePage from './screen/homePage';
import  ProductsPage  from './screen/productsPage';
import UserPage  from './screen/userPage';
import OrderPage  from './screen/ordersPage';
import  HomeNavbar  from './components/headers/HomeNavbar';
import  OtherNavbar from './components/headers/OtherNavbar';
import Footer  from './components/headers/footer';
import '../css/app.css';
import '../css/navbar.css';
import '../css/footer.css';
import '../css/product.css';
import HelpPage from './screen/helpPage';
import Test from "./screen/Test"
import { CartItem } from '../lib/data/types/search';
import useBasket from './hooks/useBasket';

function App() {
  const location = useLocation();
  const {cartItems, onAdd, onRemove, onDelete, onDeleteAll} = useBasket()
  return <>
  {location.pathname === "/" ? 
  <HomeNavbar cartItems={cartItems} onAdd={onAdd} onDelete={onDelete} onRemove={onRemove} onDeleteAll={onDeleteAll}/> :
   <OtherNavbar cartItems={cartItems} onAdd={onAdd} onDelete={onDelete} onRemove={onRemove} onDeleteAll={onDeleteAll}/>}
  <Switch>
    <Route path="/products">
      <ProductsPage onAdd={onAdd} />
    </Route>
    <Route path="/member-page">
      <UserPage />
    </Route>
    <Route path="/orders">
      <OrderPage />
    </Route>
    <Route path="/help">
      <HelpPage/>
    </Route>
    <Route path="/">
      <HomePage/>
    </Route>
  </Switch>
  <Footer/>
</>
}



export default App;
