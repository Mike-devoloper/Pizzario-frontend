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
    useEffect(() => {
        const result = [
            {
                "_id": "6719a9d6c85688c6199f8979",
                "productStatus": "PROCESS",
                "productCollection": "DRINK",
                "productName": "orange juice",
                "productPrice": 2,
                "productLeftCount": 80,
                "productSize": "NORMAL",
                "productVolume": 1,
                "productDesc": "This juice made from the fresh oranges which came directly from garden !",
                "productImages": [
                    "uploads/products/dd983730-c027-4f5b-91c8-321b80b1d870.jpg"
                ],
                "productViews": 0,
                "createdAt": "2024-10-24T01:58:46.213Z",
                "updatedAt": "2024-10-24T01:58:55.709Z",
                "__v": 0
            },
            {
                "_id": "66fd0d3ef493d2fc89f66912",
                "productStatus": "PROCESS",
                "productCollection": "DISH",
                "productName": "Osh",
                "productPrice": 4,
                "productLeftCount": 8,
                "productSize": "NORMAL",
                "productVolume": 1,
                "productDesc": "delicious",
                "productImages": [
                    "uploads/products/f572aedf-dcf0-4999-8d70-d07204e5d0d3.jpg"
                ],
                "productViews": 0,
                "createdAt": "2024-10-02T09:07:10.127Z",
                "updatedAt": "2024-10-24T01:49:36.230Z",
                "__v": 0
            },
        ]
        //@ts-ignore
        setPopularDishes(result);
    }, [])
    console.log("Popular => ", popularDishes);

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