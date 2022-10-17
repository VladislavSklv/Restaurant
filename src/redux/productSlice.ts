import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IIngredient } from "../API/vendorAPI";

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
    id: string;
    myId: number;
    ingredients: IIngredient[];
}

const initialState = { products: [] } as ingredientsState;

const productSlice = createSlice({
    name: 'productWithIngredients',
    initialState,
    reducers: {
        addProduct(state, action: PayloadAction<IfinalProduct>) {
            state.products.push(action.payload);
            const filteredProducts: IfinalProduct[] = [];
            for (let j = 0; j < state.products.length; j++) {
                let mainProduct = {...state.products[j], quantity: 0};
                state.products.forEach(product => {
                    if(mainProduct.id === product.id && mainProduct.ingredients.length === 0 && product.ingredients.length === 0){
                        mainProduct.quantity += product.quantity;
                    } else if (mainProduct.id === product.id && mainProduct.ingredients.length === product.ingredients.length && mainProduct.ingredients.length !== 0){
                        let checkerArray = [];
                        for(let p = 0; p < mainProduct.ingredients.length; p++) {
                            for (let i = 0; i < product.ingredients.length; i++){
                                if(mainProduct.ingredients[p].id === product.ingredients[i].id) {
                                    checkerArray.push(true);
                                }
                            }
                        };
                        if(checkerArray.length === mainProduct.ingredients.length){
                            mainProduct.quantity += product.quantity;
                        }
                    };
                });
                let checker = true;
                for(let i = 0; i < filteredProducts.length; i++) {
                    if(mainProduct.quantity === 0 || (filteredProducts[i].id === mainProduct.id && JSON.stringify(filteredProducts[i].ingredients) === JSON.stringify(mainProduct.ingredients))) {
                        checker = false;
                        break;
                    }
                };
                if(checker) filteredProducts.push(mainProduct);
		    };
            state.products = [...filteredProducts];
        },
        removeProduct(state, action: PayloadAction<{id: string, myId: number }>) {
            const arrayById = state.products.filter(product => product.id === action.payload.id);
            arrayById.pop();
            state.products = state.products.filter(product => product.id !== action.payload.id);
            state.products = [...state.products, ...arrayById];
        },
        filterProducts(state) {
            const filteredProducts: IfinalProduct[] = [];
            for (let j = 0; j < state.products.length; j++) {
                let mainProduct = {...state.products[j], quantity: 0};
                state.products.forEach(product => {
                    if(mainProduct.id === product.id && mainProduct.ingredients.length === 0 && product.ingredients.length === 0){
                        mainProduct.quantity += product.quantity;
                    } else if (mainProduct.id === product.id && mainProduct.ingredients.length === product.ingredients.length && mainProduct.ingredients.length !== 0){
                        let checkerArray = [];
                        for(let p = 0; p < mainProduct.ingredients.length; p++) {
                            for (let i = 0; i < product.ingredients.length; i++){
                                if(mainProduct.ingredients[p].id === product.ingredients[i].id) {
                                    checkerArray.push(true);
                                }
                            }
                        };
                        if(checkerArray.length === mainProduct.ingredients.length){
                            mainProduct.quantity += product.quantity;
                        }
                    };
                });
                let checker = true;
                for(let i = 0; i < filteredProducts.length; i++) {
                    if(mainProduct.quantity === 0 || (filteredProducts[i].id === mainProduct.id && JSON.stringify(filteredProducts[i].ingredients) === JSON.stringify(mainProduct.ingredients))) {
                        checker = false;
                        break;
                    }
                };
                if(checker) filteredProducts.push(mainProduct);
		    };
            state.products = [...filteredProducts];
        },
        incrementQuantity(state, action: PayloadAction<{id: string, myId: number }>) {
            state.products = state.products.map(product => {
                if(product.id === action.payload.id && product.myId === action.payload.myId){
                    return product = {...product, quantity: product.quantity + 1};
                } else {
                    return product;
                }
            });
        },
        decrementQuantity(state, action: PayloadAction<{id: string, myId: number }>) {
            state.products = state.products.map(product => {
                if(product.id === action.payload.id && product.myId === action.payload.myId){
                    return product = {...product, quantity: product.quantity - 1};
                } else {
                    return product;
                }
            });
        },
        addIngredientsToProductByMyId(state, action: PayloadAction<addIngredientPayload>) {
            state.products = state.products.map(product => {
                if(product.id === action.payload.id && product.myId === action.payload.myId){
                    const newIngredients: IIngredient[] = [];
                    action.payload.ingredients.forEach(ingredient => {
                        newIngredients.push(ingredient);
                    });
                    return product = {...product, ingredients: newIngredients};
                } else {
                    return product;
                }
            });
        },
        clearProducts(state){
            state.products = [];
        }
    }
});

export const {addProduct, removeProduct, incrementQuantity, decrementQuantity, filterProducts, addIngredientsToProductByMyId, clearProducts} = productSlice.actions;
export default productSlice.reducer;