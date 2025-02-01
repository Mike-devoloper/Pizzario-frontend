import React from "react"
import {Box, Stack} from "@mui/material"
import Button from "@mui/material/Button"
import TabPanel from "@mui/lab/TabPanel"
import moment from "moment"
import { retrieverFinishedOrder } from "./selector";
import { createSelector } from "reselect"
import { useSelector } from "react-redux"
import { Order, OrderItem, OrderUpdateInput } from "../../../lib/data/types/order"
import { Messages, serverApi } from "../../../lib/data/config"
import { Product } from "../../../lib/data/types/product"
import { T } from "../../../lib/data/types/common"
import { OrderStatus } from "../../../lib/data/enums/order.enums"
import { sweetErrorHandling } from "../../../lib/data/sweetAlert"
import OrderService from "../../services/OrderService"
import { useGlobals } from "../../hooks/useGlobals"



const finishedOrderRetriver = createSelector(retrieverFinishedOrder,
    (finishedOrder) => ({finishedOrder}))


export default function FinishedOrders() {
    const {finishedOrder} = useSelector(finishedOrderRetriver)
    return (
        <TabPanel value={"3"}>
            <Stack>
            {finishedOrder?.map((order: Order) => {
                    return (
                        <Box key={order._id} className={"order-main-box"}>
                            <Box className={"order-box-scroll"}>
                            {order?.orderItems?.map((item: OrderItem) => {
                                const product: Product = order.productData.filter((ele: Product) => item.productId === ele._id)[0];
                                const imagePath = `${serverApi}/${product.productImages[0]}`
                                    return (
                                        <Box className={"orders-name-price"}>
                                            <img 
                                            src={imagePath}
                                            className="order-dish-img"/>
                                            <p className="title-dish">{product.productName}</p>
                                            <Box className={"price-box"}>
                                                <p>${item.itemPrice}</p>
                                                <img src="/icons/close.svg"/>
                                                <p>{item.itemQuantity}</p>
                                                <img src="/icons/pause.svg"/>
                                                <p style={{marginLeft: "15px"}}>${item.itemQuantity * item.itemPrice}</p>
                                            </Box>
                                        </Box>
                                    )
                                })}
                            </Box>
                            <Box className={"total-price-box"}>
                                <Box className={"total-box"}>
                                    <p>Product price</p>
                                    <p>${order.orderTotal - order.orderDelivery}</p>
                                    <img src="/icons/plus.svg" style={{marginLeft: "20px"}} />
                                    <p>Delivery cost</p>
                                    <p>${order.orderDelivery}</p>
                                    <img src="/icons/pause.svg" style={{marginLeft: "20px"}} />
                                    <p>Total</p>
                                    <p>${order.orderTotal}</p>
                                </Box>
                            </Box>
                        </Box>

                    )
                })}

                {!finishedOrder || (finishedOrder.length === 0 && (
                    <Box display={"flex"} flexDirection={"row"} justifyContent={"center"}>
                        <img
                        src={"/icons/noimage-list.svg"}
                        style={{width: 300 , height: 300}}/>
                    </Box>
                ))}
            </Stack>
        </TabPanel>
    )
}