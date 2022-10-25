import React, { useEffect, useRef, useState } from 'react';
import { IProduct } from '../API/vendorAPI';
import { useAppDispatch, useAppSelector } from '../hooks/hooks';
import { addProduct, decrementQuantity, removeProduct } from '../redux/productSlice';
import MinMaxBtns from './UI/MinMaxBtns';

interface productProps {
    product: IProduct;
    setIsDetails: React.Dispatch<React.SetStateAction<boolean>>;
    setDetailsId: React.Dispatch<React.SetStateAction<number>>;
    setIsOpacity: React.Dispatch<React.SetStateAction<boolean>>;
    myId: number;
    setMyId: React.Dispatch<React.SetStateAction<number>>;
}

const Product:React.FC<productProps> = ({product, setDetailsId, setIsDetails, setIsOpacity, myId, setMyId}) => {
    const [numberOf, setNumberOf] = useState(0);
    const [price, setPrice] = useState(0);
    const productRef = useRef<HTMLDivElement | any>();

    const dispatch = useAppDispatch();
    const {products} = useAppSelector(state => state.product);

    /* counting full product price */
    useEffect(() => {
        if(products !== undefined) {
            let quantity = 0;
            if(products.length > 0) {
                products.forEach(finalProduct => {
                    if(finalProduct.id === product.id) quantity += finalProduct.quantity;
                });
            }
            setNumberOf(quantity);
            setMyId(prev => prev += quantity + 1);
        };
        if(products !== undefined && products.length > 0) {
            let thisPrice = 0;
            products.forEach(thisProduct => {
                if(thisProduct.id === product.id){
                    let thisProductPrice = 0;
                    thisProductPrice += thisProduct.price;
                    thisProduct.ingredients.forEach(thisIngredient => {
                        thisProductPrice += thisIngredient.price;
                    });
                    thisProductPrice *= thisProduct.quantity;
                    thisPrice += thisProductPrice;
                };
            });
            setPrice(thisPrice);
        };
    }, [products]);

    /* Handlers */
    const onClickMinHandler = () => {
        setNumberOf(prev => prev - 1);
        let checker = true;
        let products1 = [...products];
        let reverseProducts = products1.reverse();
        for (let j = 0; j < reverseProducts.length; j++) {
            if(reverseProducts[j].id === product.id && reverseProducts[j].quantity > 1) {
                dispatch(decrementQuantity({id: reverseProducts[j].id, myId: reverseProducts[j].myId}));
                checker = false;
                break;
            }
            if(reverseProducts[j].id === product.id){
                break;
            }
        };
        if(checker) dispatch(removeProduct({id: product.id, myId}));
    };

    const onClickMaxHandler = () => {
        if(!product.hasIngredients){
            const p = new Promise((resolve, reject) => {
                dispatch(addProduct({
                    myId: myId,
                    id: product.id,
                    name: product.name,
                    price: product.price,
                    quantity: 1,
                    image: product.image,
                    ingredients: [],
                }));
                resolve(true);
                reject(false);
            });
            setNumberOf(prev => prev + 1);
            p.then((data) => {
                if(data) {
                    setMyId(prev => prev + 1);
                }
            })
        } else {
            setDetailsId(parseInt(product.id));
            setIsDetails(true);
            setIsOpacity(true);
        }
    };

    return (
        <div ref={productRef} className='product'>
            <div 
                onClick={() => {
                    setIsDetails(true);
                    setDetailsId(parseInt(product.id));
                    setIsOpacity(true);
                }}
                className='product__img'
            ><img src={product.image || '../images/food.svg'} alt={product.name} />
            </div>
            <div className='product__content'>
                <h2 
                    onClick={() => {
                        setIsDetails(true);
                        setDetailsId(parseInt(product.id));
                        setIsOpacity(true);
                    }}
                    className='product__name'
                >{product.name}</h2>
                <p className='product__weight'>
                    <span style={numberOf === 0 ? {opacity: 1, pointerEvents: 'all', transitionDelay: '150ms', transform: 'translateX(0)'} : {opacity: 0, pointerEvents: 'none', transitionDelay: '0ms', transform: 'translateX(100%)'}} className='product__noprice'>{product.weight && `${product.weight} гр `}</span>
                    <span style={numberOf === 0 ? {opacity: 0, pointerEvents: 'none', transitionDelay: '0ms'} : {opacity: 1, pointerEvents: 'all', transitionDelay: '150ms'}} className='product__price'>{price}₽ {product.weight && `/ ${product.weight} гр `}</span>
                </p>
                {numberOf === 0 
                    ? <button 
                        onClick={() => onClickMaxHandler()}
                        className='product__btn'
                    >{product.price}₽</button>
                    : <MinMaxBtns numberOf={numberOf} onClickMax={onClickMaxHandler} onClickMin={onClickMinHandler} />
                }
            </div>
        </div>
    );
};

export default Product;