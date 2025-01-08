import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';


export interface IModifier {
    id: number;
    name: string;
    price?: number;
}

export interface IModifierScheme {
    id: number;
    name: string;
    minAmount: number;
    maxAmount: number;
    isRequired: boolean;
    modifiers: IModifier[];
}

export interface IProduct {
    id: number;
    name: string;
    description: string;
    images: string[];
    price: number;
    weight: number;
    energy: number;
    fat: number;
    proteins: number;
    carbohydrates: number;
    measure: string;
    modifierScheme: IModifierScheme[];
}

export interface Idata {
    data: mainArray[];
}

export interface mainArray {
    id: number;
    name: string;
    products: IProduct[];
}
/* export interface IProduct {
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
 */
export interface ProductMenuProps{
    companyId: string;
}

export interface IIngredient {
    id: number;
    name: string;
    price: number;
}

/* export interface IIngredientGroup {
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
    companyId: string;
    productId: string;
} */

export interface IOrderProduct {
    id: number,
    name: string,
    price: number,
    quantity: number,
    ingredients: IIngredient[]
}

export interface IOrder {
    user_id: number,
    vendor_id: string,
    place: number,
    products: IOrderProduct[]
}
 

export const vendorApi = createApi({
    reducerPath: 'vendorApi',
    baseQuery: fetchBaseQuery({baseUrl: 'https://menu.silkroadpro.com/api/v1/companies/'}),
    endpoints: (builder) => ({
        getProductsMenu: builder.query<Idata, ProductMenuProps>({
            query: ({companyId}) => `${companyId}/menu/`,
        })
    }),
});

export const { useGetProductsMenuQuery } = vendorApi;