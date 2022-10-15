import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { IOrder, IOrderProduct } from '../API/vendorAPI';
import ProductInCart from '../components/ProductInCart';
import MinMaxBtns from '../components/UI/MinMaxBtns';
import { useAppDispatch, useAppSelector } from '../hooks/hooks';
import { clearProducts, IfinalProduct } from '../redux/productSlice';

interface cartPageProps{
    vendorId: number;
    totalPrice: number;
};

const CartPage: React.FC<cartPageProps> = ({vendorId, totalPrice}) => {
    const [placeNumber, setPlaceNumber] = useState(1);
    const [thanking, setThanking] = useState(false);

    const {products} = useAppSelector(state => state.product);
    const dispatch = useAppDispatch();

    const navigate = useNavigate();

    let order: IOrder = {
        user_id: Telegram.WebApp.initDataUnsafe.user?.id!,
        place: placeNumber,
        vendor_id: vendorId,
        products: [],
    };

    window.Telegram.WebApp.BackButton.onClick(() => navigate(-1));

    const setBtnOrder = () => {
        /* https://etoolz.ru/api/v1/vendor/${vendorId}/order */
        window.Telegram.WebApp.onEvent('mainButtonClicked', () => {
            fetch(`https://etoolz.ru/api/v1/vendor/${vendorId}/order`,{
                body: JSON.stringify(order),
                method: 'POST'
            }).then(() => {
                window.Telegram.WebApp.MainButton.setParams({'color': '#4986CC', 'is_visible': false, 'text_color': '#ffffff', 'text': 'Заказ выполнен!', 'is_active': false}).disable();
            }).then(() => {
                setThanking(true);
            }).then(() =>{
                setTimeout(() => {
                    Telegram.WebApp.close();
                }, 1500)
            });
        });
    };

    if(placeNumber > 0) setBtnOrder();

    return (
        <div className='cart'>
            <div className='cart__title-with-icon'>
                <h1 className='title title_cart'>Корзина</h1>
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
                <div className={thanking ? 'opacity-block opacity-block_active' : 'opacity-block'}></div>
                <div className={thanking ? 'thanking thanking_active' : 'thanking'}>Спасибо за заказ!</div>
            </div>
            <div className='cart__total'>Общая стоимость <span>{totalPrice}₽</span></div>
        </div>
    );
};

export default CartPage;