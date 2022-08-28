import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IIngredient, IProduct } from "../API/vendorAPI";

export interface IfinalProduct{
    myId: number,
    id: string,
    name: string,
    price: number,
    quantity: number,
    image: string,
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
        addProduct(state, action: PayloadAction<IfinalProduct>) {
            state.products.push(action.payload);
            /* if (state.products.length > 0) {
                state.products = state.products.map(product => {
                    let checker = 0;
                    let checker2 = 1;
                    const productValues = Object.values(product);
                    const payloadValues = Object.values(action.payload);
                    productValues.forEach(productItem => {
                        payloadValues.forEach(payloadItem => {
                            if(payloadItem === productItem) checker = 1;
                            if(checker === 0) checker2 = 0;
                        });
                    });
                    if(checker2 === 1) {console.log('add quantity'); return product = {...product, quantity: product.quantity + 1}} 
                    else {console.log('add item'); return action.payload};
                });
            } else {
                state.products.push(action.payload);
            } */
        },
        removeProduct(state, action: PayloadAction<{id: string, myId: number }>) {
            const arrayById = state.products.filter(product => product.id === action.payload.id);
            arrayById.pop();
            state.products = state.products.filter(product => product.id !== action.payload.id);
            state.products = [...state.products, ...arrayById];
        },
        incrementQuantity(state, action: PayloadAction<{id: string, myId: number }>) {
            state.products = state.products.map(product => {
                if(product.id === action.payload.id && product.myId === action.payload.myId){
                    return product = {...product, quantity: product.quantity + 1};
                } else {
                    return product;
                }
            })
        },
        decrementQuantity(state, action: PayloadAction<{id: string, myId: number }>) {
            state.products = state.products.map(product => {
                if(product.id === action.payload.id && product.myId === action.payload.myId){
                    return product = {...product, quantity: product.quantity - 1};
                } else {
                    return product;
                }
            })
        },
    }
});

export const {addProduct, removeProduct, incrementQuantity, decrementQuantity} = productSlice.actions;
export default productSlice.reducer;