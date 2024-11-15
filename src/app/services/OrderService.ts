import axios from "axios";
import { serverApi } from "../../lib/data/config";
import { Order, OrderInquiry, OrderItemInput } from "../../lib/data/types/order";
import { CartItem } from "../../lib/data/types/search";


class OrderService {
    private readonly path: string;

    constructor() {
        this.path = serverApi;
    }


    public async createOrder(input: CartItem[]):Promise<Order> {
        try {
            const orderItem:OrderItemInput[] = input.map((cartItem: CartItem) => {
                return {
                 itemQuantity: cartItem.quantity,
                itemPrice: cartItem.price,
                productId: cartItem._id
                }
            })

            const url = this.path + "/order/create"
            const result = await axios.post(url, orderItem, {withCredentials: true})
            console.log("CreateOrder ", result)
            return result.data;
            
        } catch(err) {
            console.log("error on createOrder ", err);
            throw err;
        }
    }

    public async getMyOrder(input: OrderInquiry):Promise<Order[]> {
        try {
          
            axios.defaults.withCredentials = true;
            const url = `${this.path}/order/all`;
            const query = `?page=${input.page}&limit=${input.limit}&orderStatus=${input.orderStatus}`

           const result = await axios.get(url + query, {withCredentials: true})
           return result.data;

        } catch(err) {
            console.log("error on getMyOrder ", err);
            throw err;
        }
    }


}

export default OrderService;