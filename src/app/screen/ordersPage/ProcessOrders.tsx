import React from "react"
import {Box, Stack} from "@mui/material"
import Button from "@mui/material/Button"
import TabPanel from "@mui/lab/TabPanel"
import moment from "moment"
import { retrieverProccesOrder } from "./selector";
import { createSelector } from "reselect"
import { useSelector } from "react-redux"
import { Order, OrderItem, OrderUpdateInput } from "../../../lib/data/types/order"
import { Messages, serverApi } from "../../../lib/data/config"
import { Product } from "../../../lib/data/types/product"
import { useGlobals } from "../../hooks/useGlobals"
import { OrderStatus } from "../../../lib/data/enums/order.enums"
import OrderService from "../../services/OrderService"
import { T } from "../../../lib/data/types/common"
import { sweetErrorHandling } from "../../../lib/data/sweetAlert"



const proccesOrderRetriver = createSelector(retrieverProccesOrder,
    (proccesOrder) => ({proccesOrder}))
    interface ProccesOrderProps {
        setValue: (input:string) => void
    }



export default function ProcessOrders(props: ProccesOrderProps) {
    const {proccesOrder} = useSelector(proccesOrderRetriver)
    const {authMember, setOrderBuilder} = useGlobals()
    const {setValue} = props;

    //handler 
    const proccesOrderHandler = async (e:T) => {
        try {
            if(!authMember) throw new Error(Messages.error2)
            //Payment Procces
            const orderId = e.target.value;
            const input: OrderUpdateInput = {orderId: orderId, orderStatus: OrderStatus.FINISH}
            const confirmation = window.confirm("Have you received your order ?")
            if(confirmation) {
                const order = new OrderService()
                await order.updateOrder(input)
                setValue("3")
                setOrderBuilder(new Date())
            }
        } catch(err) {
            console.log(console.log("Delete Order => "), err)
            sweetErrorHandling(err).then()
        } }
    return (
        <TabPanel value={"2"}>
            <Stack>
        {proccesOrder?.map((order: Order) => {
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
                                    <p className="data-compl">
                                    {moment().format("YY-MM-DD HH:mm")}
                                </p>
                                <Button variant={"contained"} className={"verify-btn"} onClick={proccesOrderHandler} value={order._id}>
                                    Verify to Fulfil
                                </Button>
                                </Box>
                            </Box>
                        </Box>

                    )
                })}

                {!proccesOrder || (proccesOrder.length === 0&& (
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