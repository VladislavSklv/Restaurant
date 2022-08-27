import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IIngredient, IProduct } from "../API/vendorAPI";

export interface IfinalProduct{
    id: string,
    name: string,
    price: number,
    quantity: string,
    ingredients: IIngredient[],
}

interface ingredientsState{
    products: IfinalProduct[];
}

interface addIngredientPayload {
    product: IProduct;
    ingredient: IIngredient;
}

const initialState = { products: [] } as ingredientsState;

const productSlice = createSlice({
    name: 'productWithIngredients',
    initialState,
    reducers: {
    }
});

export const {} = productSlice.actions;
export default productSlice.reducer;