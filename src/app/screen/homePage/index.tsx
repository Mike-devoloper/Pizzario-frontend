import React, { useEffect } from "react"
import { Container } from "@mui/material";
import ActiveUsers from "./ActiveUsers";
import Advertisement from "./Advertisement";
import Events from "./Event";
import NewDishes from "./NewDishes";
import PopularDishes from "./PopularDishes";
import Statistics from "./Statistics";
import "../../../css/home.css"


export default function HomePage() {
    //Selector: Store => Data

    useEffect(() => {
        //Backend server Request => Data
        //slice: Data => Store
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