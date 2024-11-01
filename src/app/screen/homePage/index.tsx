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
import { createSelector } from "reselect";
import {setPopularDishes} from "./slice"
import {retrieverPopularDishes} from "./selector"
import { Product } from "../../../lib/data/types/product";

/*REDUX SLICE AND SELECTOR */
const actionDispatch = (dispatch: Dispatch) => ({
    setPopularDishes: (data: Product[]) => dispatch(setPopularDishes(data))
});
const PopularDishesRetriever = createSelector(retrieverPopularDishes,
    (popularDishes) => ({popularDishes}))


export default function HomePage() {
    //Selector: Store => Data
    const {popularDishes} = useSelector(PopularDishesRetriever)
    const {setPopularDishes} = actionDispatch(useDispatch())
    console.log(process.env.REACT_APP_API_URL)
    useEffect(() => {}, [])


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