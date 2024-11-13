//REACT APP STATE

import { Member } from "./member";
import { Order } from "./order";
import { Product } from "./product";

export interface AppRootState {
    orderPage: OrderPageState;
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


export interface OrderPageState {
    pausedOrder: Order[]
    proccesOrder: Order[]
    finishedOrder: Order[]
}