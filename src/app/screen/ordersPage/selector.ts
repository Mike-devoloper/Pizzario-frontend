import {createSelector} from "reselect"
import { AppRootState } from "../../../lib/data/types/screen";

const selectOrderPage = (state: AppRootState) => state.orderPage;

export const retrieverPausedOrder = createSelector(selectOrderPage, (OrdersPage) => OrdersPage.pausedOrder)
export const retrieverProccesOrder = createSelector(selectOrderPage, (OrdersPage) => OrdersPage.proccesOrder)
export const retrieverFinishedOrder = createSelector(selectOrderPage, (OrdersPage) => OrdersPage.finishedOrder)


