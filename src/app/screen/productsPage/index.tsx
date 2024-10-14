import React from 'react';
import { Link, Route, Switch, useRouteMatch } from 'react-router-dom';
import { Container } from "@mui/material";
import ChosenProduct  from './chosenProduct';
import Products from './products';
export default function ProductsPage() {
    const products = useRouteMatch();
    return ( 
    <div className={"products-page"}>
      <Switch>
    <Route path={`${products.path}/:productId`}>
      <ChosenProduct/>
    </Route>
    <Route path={`${products.path}`}>
      <Products/>
    </Route>
    </Switch>
    </div>
    )
  }