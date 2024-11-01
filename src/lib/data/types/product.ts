import { ProductCollection, ProductSize, ProductStatus } from "../enums/product.enums";

export interface ProductInquiry {
    productCollection?: ProductCollection;
    order: string;
    page: number;
    search?: string;
    limit: number;
}


export interface Product {
    _id: string;
    productStatus: ProductStatus;
    productCollection: ProductCollection;
    productName: string;
    productPrice: number;
    productLeftCount: number;
    productSize: ProductSize;
    productVolume: number;
    productDesc?: string;
    productImages: string[];
    productViews: number;
    createdAt: Date;
    updatedAt: Date;
}