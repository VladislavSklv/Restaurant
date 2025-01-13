import React, { useEffect, useState } from 'react';
import { useAppDispatch } from '../hooks/hooks';
import { decrementQuantity, IfinalProduct, incrementQuantity, removeProduct } from '../redux/productSlice';
import MinMaxBtns from './UI/MinMaxBtns';

interface prodcutInCartProps {
    product: IfinalProduct;
}

const ProductInCart:React.FC<prodcutInCartProps> = ({product}) => {
    const [numberOf, setNumberOf] = useState(product.quantity);
    const [ingredientsPrice, setIngredientsPrice] = useState(0);

    /* Counting ingredients price */
    useEffect(() => {
        product.ingredients.forEach(ingredient => {
            setIngredientsPrice(prev => prev += ingredient.price);
        });
    },  []);

    /* Checking number of products if main products array will change */
    useEffect(() => {
        setNumberOf(product.quantity);
    }, [product]);

    const dispatch = useAppDispatch();

    /* Handlers */
    const onClickMinHandler = () => {
        if(numberOf === 1) {
            dispatch(removeProduct({id: product.id, myId: product.myId}));
        } else {
            dispatch(decrementQuantity({id: product.id, myId: product.myId}));
            setNumberOf(prev => prev - 1);
        }
    };

    const onClickMaxHandler = () => {
        dispatch(incrementQuantity({id: product.id, myId: product.myId}));
        setNumberOf(prev => prev + 1);
    };

    return (
        <div className='cart-item'>
            <div className='cart-item__img'><img src={product.image || '../images/food.svg'} alt={product.name} /></div>
            <div className='cart-item__content'>
                <h2 className='cart-item__title'>{product.name}</h2>
                {product.ingredients.length > 0 && 
                    <p className='cart-item__ingredients'>
                        {product.ingredients.length > 0 && product.ingredients.map((ingredient, i) => (
                            <span key={i + JSON.stringify(product)}>
                                {i === 0 ? `${ingredient.name} `: `/ ${ingredient.name} `}
                            </span>
                        ))}
                    </p>
                }
                <div className='cart-item__wrapper'>
                    <span className='cart-item__price'>{(product.price + ingredientsPrice) * numberOf} so’m</span>
                    <MinMaxBtns onClickMin={onClickMinHandler} onClickMax={onClickMaxHandler} numberOf={numberOf} />
                </div>
            </div>
        </div>
    );
};

export default ProductInCart;