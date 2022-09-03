import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';

export interface IProduct {
    id: string;
    description: string;
    image: string;
    hasIngredients: boolean;
    name: string;
    price: number;
    weight: string;
}

export interface IProductsTab {
    id: string;
    name: string;
    products: IProduct[];
}

export interface ProductMenuProps{
    vendorId: number;
}

export interface IIngredient {
    id: number;
    name: string;
    price: number;
}

export interface IIngredientGroup {
    id: string;
    ingredients: IIngredient[];
    name: string;
}

export interface IProductDetails {
    id: string;
    description: string;
    image: string;
    hasIngredients: boolean;
    name: string;
    price: number;
    weight: string;
    ingredientGroups: IIngredientGroup[];
    ingredients: IIngredient[];
}

export interface ProductDetailsProps{
    vendorId: number;
    productId: string;
}

export interface IOrderProduct {
    id: number,
    name: string,
    price: number,
    quantity: number,
    ingredients: IIngredient[]
}

export interface IOrder {
    user_id: number,
    vendor_id: number,
    place: number,
    products: IOrderProduct[]
}
 

export const vendorApi = createApi({
    reducerPath: 'vendorApi',
    baseQuery: fetchBaseQuery({baseUrl: 'https://etoolz.ru/api/v1/vendor/'}),
    endpoints: (builder) => ({
        getProductsMenu: builder.query<IProductsTab[], ProductMenuProps>({
            query: ({vendorId}) => `${vendorId}/menu/`,
        }),
        getProductDetails: builder.query<IProductDetails, ProductDetailsProps>({
            query: ({vendorId, productId}) => `${vendorId}/product/${productId}/`,
        }),
    }),
});

export const { useGetProductsMenuQuery, useGetProductDetailsQuery } = vendorApi;