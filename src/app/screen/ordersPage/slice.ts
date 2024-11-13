import {createSlice} from "@reduxjs/toolkit"
import { OrderPageState } from "../../../lib/data/types/screen"


const initialState: OrderPageState = {
    pausedOrder: [],
    proccesOrder: [],
    finishedOrder: [],
}

const orderPageSlice = createSlice({
    name: "orderPage",
    initialState,
    reducers: {
        setPausedOrder: (state, action) => {
            state.pausedOrder = action.payload
        },

        setProccesOrder: (state, action) => {
            state.proccesOrder = action.payload
        },

        setFinishedOrder: (state, action) => {
            state.finishedOrder = action.payload
        }
    }
});


export const {setPausedOrder, setProccesOrder, setFinishedOrder} = orderPageSlice.actions;

const OrderPageReducer = orderPageSlice.reducer;

export default OrderPageReducer;