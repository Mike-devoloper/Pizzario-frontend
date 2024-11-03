//REACT APP STATE

import { Member } from "./member";
import { Product } from "./product";

export interface AppRootState {
    homePage: HomePageState;
    productsPage: ProductsPage;
}

export interface HomePageState {
    popularDishes: Product[]
    newDishes: Product[]
    topUsers: Member[]
}

export interface ProductsPage {
    products: Product[]
    chosenProduct: Product | null
    restaurant: Member | null
}