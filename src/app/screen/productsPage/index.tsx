import React from 'react';
import { Link, Route, Switch, useRouteMatch } from 'react-router-dom';
import { Container } from "@mui/material";
import ChosenProduct  from './chosenProduct';
import Products from './products';
import { CartItem } from '../../../lib/data/types/search';

interface ProductsPageItems {
  onAdd: (item: CartItem) => void
}
export default function ProductsPage(props: ProductsPageItems) {
    const products = useRouteMatch();
    const {onAdd} = props;
    console.log("cartItem", )
    return ( 
    <div className={"products-page"}>
      <Switch>
    <Route path={`${products.path}/:productId`}>
      <ChosenProduct onAdd={onAdd}/>
    </Route>
    <Route path={`${products.path}`}>
      <Products onAdd={onAdd}/>
    </Route>
    </Switch>
    </div>
    )
  }