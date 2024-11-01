import {createSelector} from "reselect";
import { AppRootState } from "../../../lib/data/types/screen";

const selectHomePage = (state: AppRootState) => state.homePage;

const retrieverPopularDishes = createSelector(
    selectHomePage, (HomePage) => HomePage.popularDishes);
    
const retrieverNewDishes = createSelector(
    selectHomePage, (HomePage) => HomePage.newDishes);

const retrieverTopUsers = createSelector(
    selectHomePage, (HomePage) => HomePage.topUsers)