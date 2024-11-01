//REACT APP STATE

import { Product } from "./product";

export interface AppRootState {
    homePage: HomePageState;
}

export interface HomePageState {
    popularDishes: Product[]
    newDishes: Product[]
    topUsers: []
}