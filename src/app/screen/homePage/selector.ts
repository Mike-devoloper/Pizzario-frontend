import {createSelector} from "reselect";
import { AppRootState } from "../../../lib/data/types/screen";

export const selectHomePage = (state: AppRootState) => state.homePage;

export const retrieverPopularDishes = createSelector(
    selectHomePage, (HomePage) => HomePage.popularDishes);
    
export const retrieverNewDishes = createSelector(
    selectHomePage, (HomePage) => HomePage.newDishes);

export const retrieverTopUsers = createSelector(
    selectHomePage, (HomePage) => HomePage.topUsers)