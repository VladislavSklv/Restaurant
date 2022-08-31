import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ProductInCart from '../components/ProductInCart';
import MinMaxBtns from '../components/UI/MinMaxBtns';
import { useAppDispatch, useAppSelector } from '../hooks/hooks';
import { clearProducts } from '../redux/productSlice';

const CartPage: React.FC = () => {
    const {products} = useAppSelector(state => state.product);
    const [placeNumber, setPlaceNumber] = useState(1);
    const dispatch = useAppDispatch();

    const navigate = useNavigate();

    useEffect(() => {
        console.log(products);
    }, [products]);

    useEffect(() => {
        let totalPrice = 0;
        products.forEach(product => {
            totalPrice += product.price * product.quantity;
        });
        Telegram.WebApp.MainButton.setParams({'is_visible': true, 'text': `Заказать | ${totalPrice} ₽`})
    }, [products]);

    const onClickMinHandler = () => {
        setPlaceNumber(prev => {
            if(prev === 1) return prev;
            else return prev - 1;
        });
    }

    const onClickMaxHandler = () => {
        setPlaceNumber(prev => prev + 1);
    }

    return (
        <div className='cart'>
            <div className='cart__title-with-icon'>
                <h1 className='title'>Корзина</h1>
                <div
                    onClick={() => {
                        dispatch(clearProducts());
                        navigate('/');
                    }}
                ><img src="../../images/trash.svg" alt="cart"/></div>
            </div>
            <div className='cart__wrapper'>
                {products !== undefined && products.map(product => (
                    <ProductInCart key={product.myId + 'myId' + product.id} product={product} />
                ))}
                <div className='cart-item'>
                    <div className='cart-item__img place-number-img'><img src='../../images/tables.svg' alt='place' /></div>
                    <div className='cart-item__content'>
                        <h2 className='cart-item__title'>Номер стола</h2>
                        <MinMaxBtns onClickMin={onClickMinHandler} onClickMax={onClickMaxHandler} numberOf={placeNumber} noText={true} />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CartPage;