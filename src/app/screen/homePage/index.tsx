import React, { useEffect } from "react"
import { Container } from "@mui/material";
import ActiveUsers from "./ActiveUsers";
import Advertisement from "./Advertisement";
import Events from "./Event";
import NewDishes from "./NewDishes";
import PopularDishes from "./PopularDishes";
import Statistics from "./Statistics";
import "../../../css/home.css"
import {useDispatch, useSelector} from "react-redux"
import { Dispatch } from '@reduxjs/toolkit';
import {setPopularDishes} from "./slice"
import { Product } from "../../../lib/data/types/product";
import ProductService from "../../services/ProductService";
import { ProductCollection } from "../../../lib/data/enums/product.enums";

/*REDUX SLICE AND SELECTOR */
const actionDispatch = (dispatch: Dispatch) => ({
    setPopularDishes: (data: Product[]) => dispatch(setPopularDishes(data))
});


export default function HomePage() {
    //Selector: Store => Data
    const {setPopularDishes} = actionDispatch(useDispatch())
    useEffect(() => {
        const product = new ProductService()
        product.getProducts({
            page: 1,
            limit: 4,
            order: "productViews",
            productCollection: ProductCollection.DISH,
        }).then( data => {
            setPopularDishes(data)
        } 
        ).catch(err => console.log(err));
    }, [])

    return (
    <div className={"homepage"} >
                <Statistics/>
                <PopularDishes/>
                <NewDishes/>
                <Advertisement/>
                <ActiveUsers/>
                <Events/>
            </div>)
  }