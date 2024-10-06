import { Button, Typography } from '@mui/material';
import { Box, Container, Stack } from '@mui/system';
import React from 'react';
import { Link, Route, Switch } from 'react-router-dom';
import { HomePage } from './screen/homePage';
import '../css/app.css';
import { ProductsPage } from './screen/productsPage';
import { UserPage } from './screen/userPage';
import { OrderPage } from './screen/ordersPage';


function App() {
  return <div>
  <nav>
    <ul>
      <li>
        <Link to="/products">ProductsPage</Link>
      </li>
      <li>
        <Link to="/orders">OrdersPage</Link>
      </li>
      <li>
        <Link to="/member-page">UsersPage</Link>
      </li>
      <li>
        <Link to="/">HomePage</Link>
      </li>
    </ul>
  </nav>

  {/* A <Switch> looks through its children <Route>s and
      renders the first one that matches the current URL. */}
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
</div>
}



export default App;
