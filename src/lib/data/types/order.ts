import { OrderStatus } from "../enums/order.enums";
import { Product } from "./product";

export interface Order {
    _id: string;
    orderTotal: number;
    orderDelivery: number;
    orderStatus: OrderStatus;
    memberId: string;
    createdAt: Date;
    updatedAt: Date;
    //from aggregation
    orderItems: OrderItem[];
    productData: Product[];
}

export interface OrderItem {
    _id: string,
    itemQuantity: number,
    itemPrice: number,
    orderId: string,
    productId: string,
    createdAt: Date,
    updatedAt: Date
    
}

export interface OrderItemInput {
    productId: string;
    itemQuantity: number;
    itemPrice: number;
    orderId?: string;
}

export interface OrderInquiry {
    page: number;
    limit: number;
    orderStatus: OrderStatus;
}

export interface OrderUpdateInput {
    orderId: string;
    orderStatus: OrderStatus;
}
