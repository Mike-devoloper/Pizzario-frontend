import React from "react"
import {Box, Stack} from "@mui/material"
import Button from "@mui/material/Button"
import TabPanel from "@mui/lab/TabPanel"
import moment from "moment"
import { retrieverPausedOrder } from "./selector";
import { createSelector } from "reselect"
import { useSelector } from "react-redux"
import { Order, OrderItem, OrderUpdateInput } from "../../../lib/data/types/order"
import { Product } from "../../../lib/data/types/product"
import { Messages, serverApi } from "../../../lib/data/config"
import { sweetErrorHandling } from "../../../lib/data/sweetAlert"
import { T } from "../../../lib/data/types/common"
import { OrderStatus } from "../../../lib/data/enums/order.enums"
import { useGlobals } from "../../hooks/useGlobals"
import OrderService from "../../services/OrderService"



const pausedOrderRetriver = createSelector(retrieverPausedOrder,
    (pausedOrder) => ({pausedOrder}))
interface PausedOrderProps {
    setValue: (input: string) => void
}

export default function PausedOrders(props: PausedOrderProps) {
    const {setValue} = props;
    const {pausedOrder} = useSelector(pausedOrderRetriver)
    const {authMember, setOrderBuilder} = useGlobals()
    //HANDLERs
    const deleteOrderHandler = async (e:T) => {
        try {
            if(!authMember) throw new Error(Messages.error2)
            const orderId = e.target.value;
            const input: OrderUpdateInput = {orderId: orderId, orderStatus: OrderStatus.DELETE}
            const confirmation = window.confirm("Do you want to delete order ?")
            if(confirmation) {
                const order = new OrderService()
                await order.updateOrder(input)
                setOrderBuilder(new Date())
            }
        } catch(err) {
            console.log(console.log("Delete Order => "), err)
            sweetErrorHandling(err).then()
        }
    }

    const proccesOrderHandler = async (e:T) => {
        try {
            if(!authMember) throw new Error(Messages.error2)
            //Payment Procces
            const orderId = e.target.value;
            const input: OrderUpdateInput = {orderId: orderId, orderStatus: OrderStatus.PROCESS}
            const confirmation = window.confirm("Do you want to proceed with payment ?")
            if(confirmation) {
                const order = new OrderService()
                await order.updateOrder(input)
                setValue("2")
                setOrderBuilder(new Date())
            }
        } catch(err) {
            console.log(console.log("Delete Order => "), err)
            sweetErrorHandling(err).then()
        } }
    return (
        <TabPanel value={"1"}>
            <Stack>
                {pausedOrder?.map((order: Order) => {
                    return (
                        <Box key={order._id} className={"order-main-box"}>
                            <Box className={"order-box-scroll"}>
                                {order?.orderItems?.map((item: OrderItem) => {
                                const product: Product = order.productData.filter((ele: Product) => item.productId === ele._id)[0];
                                const imagePath = `${serverApi}/${product.productImages[0]}`
                                    return (
                                        <Box className={"orders-name-price"} key={item._id}>
                                            <img 
                                            src={imagePath}
                                            className="order-dish-img"/>
                                            <p className="title-dish">{product.productName}</p>
                                            <Box className={"price-box"}>
                                                <p>{item.itemPrice}</p>
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
                                    <Button variant={"contained"} className={"cancel-btn"} onClick={deleteOrderHandler} value={order._id}>
                                    Cancel
                                </Button>
                                <Button variant={"contained"} className={"pay-btn"} value={order._id} onClick={proccesOrderHandler}>
                                    Payment
                                </Button>
                                </Box>
                            </Box>
                        </Box>

                    )
                })}

                {!pausedOrder || pausedOrder.length === 0 && (
                    <Box display={"flex"} flexDirection={"row"} justifyContent={"center"}>
                        <img
                        src={"/icons/noimage-list.svg"}
                        style={{width: 300 , height: 300}}/>
                    </Box>
                )}
            </Stack>
        </TabPanel>
    )
}