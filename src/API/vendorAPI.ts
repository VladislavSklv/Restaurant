import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';

export interface Product {
    id: string;
    description: string;
    image: string;
    hasIngredients: boolean;
    name: string;
    price: number;
    weight: string;
}

export interface ProductsTab {
    id: string;
    name: string;
    products: Product[];
}

export interface ProductMenuProps{
    vendorId: number;
}

export interface Ingredient {
    id: string;
    name: string;
    price: number;
}

export interface ProductDetails {
    id: string;
    description: string;
    image: string;
    hasIngredients: boolean;
    name: string;
    price: number;
    weight: string;
    ingredientGroups: any[];
    ingredients: Ingredient[];
}

export interface ProductDetailsProps{
    vendorId: number;
    productId: string;
}

export const vendorApi = createApi({
    reducerPath: 'vendorApi',
    baseQuery: fetchBaseQuery({baseUrl: 'https://etoolz.ru/api/v1/vendor/'}),
    endpoints: (builder) => ({
        getProductsMenu: builder.query<ProductsTab[], ProductMenuProps>({
            query: ({vendorId}) => `${vendorId}/menu/`,
        }),
        getProductDetails: builder.query<ProductDetails, ProductDetailsProps>({
            query: ({vendorId, productId}) => `${vendorId}/product/${productId}/`,
        }),
    }),
});

export const { useGetProductsMenuQuery, useGetProductDetailsQuery } = vendorApi;