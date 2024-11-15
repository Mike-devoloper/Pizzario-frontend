import {useState, SyntheticEvent, useEffect} from "react";
import { Container, Stack, Box } from "@mui/material";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import FinishedOrders from "./FinishedOrders"
import  PausedOrders from "./PausedOrders"
import  ProcessOrders from "./ProcessOrders"
import {useDispatch, useSelector} from "react-redux"
import { Dispatch } from '@reduxjs/toolkit';
import { setPausedOrder, setProccesOrder, setFinishedOrder} from "./slice";
import { Order, OrderInquiry } from "../../../lib/data/types/order";
import "../../../css/order.css"
import { OrderStatus } from "../../../lib/data/enums/order.enums";
import OrderService from "../../services/OrderService";
import { createSelector } from "reselect";
import { retrieverPausedOrder } from "./selector";
import { useGlobals } from "../../hooks/useGlobals";
import { useHistory } from "react-router-dom";
import { serverApi } from "../../../lib/data/config";
import { MemberType } from "../../../lib/data/enums/member.enum";



const PausedOrderRetriver = createSelector(retrieverPausedOrder,
    (pausedOrder) => ({pausedOrder}))


const actionDispatch = (dispatch: Dispatch) => ({
    setPausedOrder: (data: Order[]) => dispatch(setPausedOrder(data)),
    setProccesOrder: (data: Order[]) => dispatch(setProccesOrder(data)),
    setFinishedOrder: (data: Order[]) => dispatch(setFinishedOrder(data))
});



export default function OrderPage() {
    const {setPausedOrder, setProccesOrder, setFinishedOrder} = actionDispatch(useDispatch())
    const [value, setValue] = useState("1")
    const {orderBuilder, authMember} = useGlobals()
    const history = useHistory()
    const handleChange = (e: SyntheticEvent, newValue: string) => {
        setValue(newValue)
    }
    const [orderInquiry, setOrderInquiry] = useState<OrderInquiry>({
        page: 1,
        limit: 5,
        orderStatus: OrderStatus.PAUSE
    })

    useEffect(() => {
        const order = new OrderService()
        order.getMyOrder({...orderInquiry, orderStatus: OrderStatus.PAUSE})
        .then((data) => setPausedOrder(data))
        .catch((err) => {
            console.log("error on getmyorder", err)
        })

        order.getMyOrder({...orderInquiry, orderStatus: OrderStatus.PROCESS})
        .then((data) => setProccesOrder(data))
        .catch((err) => {
            console.log("error on getmyorder", err)
        })

        order.getMyOrder({...orderInquiry, orderStatus: OrderStatus.FINISH})
        .then((data) => setFinishedOrder(data))
        .catch((err) => {
            console.log("error on getmyorder", err)
        }) 

    }, [orderInquiry, orderBuilder])
    /*Handler */
    if(!authMember) history.push("/")
    return (
        <div className={"order-page"}>
            <Container className={"order-container"}>
                <Stack className={"order-left"}>
                    <TabContext value={value}>
                        <Box className={"order-nav-frame"}>
                            <Box sx={{borderBottom: 1, borderColor: "divider"}}>
                                <Tabs 
                                className={"table-list"}
                                value={value}
                                onChange={handleChange}
                                aria-label="basic tabs example"
                                >
                                    <Tab label="PAUSED ORDERS" value={"1"}/>
                                    <Tab label="PROCESS ORDERS" value={"2"}/>
                                    <Tab label="FINISHED ORDERS" value={"3"}/>
                                </Tabs>
                            </Box>
                        </Box>
                        <Stack className={"order-main-content"}>
                            <PausedOrders setValue={setValue}/>
                            <ProcessOrders setValue={setValue}/>
                            <FinishedOrders/>
                        </Stack>
                    </TabContext>
                </Stack>
            </Container>

            <Stack className={"order-right-box"}>
                <Box className={"order-info-box"}>
                    <Box className={"member-box"}>
                        <div className={"order-user-img"}>
                            <img 
                            src={authMember?.memberImage ? `${serverApi}/${authMember.memberImage}`: "/icons/default-user.svg" }
                            className="order-user-avatar"/>
                            <div className="order-user-icon-box">
                                <img 
                                src={authMember?.memberType === MemberType.RESTAURANT ? "/icons/restaurant.svg" : "/icons/user-badge.svg"}
                                className="order-user-prof-img"/>
                            </div>
                            <p className="order-user-name">{authMember?.memberNick}</p>
                        </div>
                    </Box>
                    <div className="liner"/>
                    <Box className={"user-location"}><LocationOnIcon/><p className="order-user-address">{authMember?.memberAddress ? authMember.memberAddress : "no exist   "}</p></Box>
                </Box>
            <Stack className="payment-card-box">
              <Stack className={"payment-info-box"}>
                <input type="text" placeholder="Card number: 5432 5437 0098 6723" className="card-input"/>
                <input type="text" placeholder="07/24" className="date-input"/>
                <input type="text" placeholder="CVC: 707" className="cvc-input"/>
                <input type="text" placeholder="Mike Cooper" className="name-input"/>
                 <Stack className={"card-img"}>
                    <img src="/icons/visa-card.svg" alt=""/>
                    <img src="/icons/western-card.svg" alt=""/>
                    <img src="/icons/paypal-card.svg" alt=""/>
                    <img src="/icons/master-card.svg" alt=""/>
                 </Stack>
              </Stack>
            </Stack>
          </Stack>
        </div>
    )
}