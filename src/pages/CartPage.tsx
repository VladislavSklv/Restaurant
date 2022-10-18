import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { IOrder, IOrderProduct } from '../API/vendorAPI';
import Modal from '../components/Modal';
import ProductInCart from '../components/ProductInCart';
import MinMaxBtns from '../components/UI/MinMaxBtns';
import MyInput from '../components/UI/MyInput';
import { useAppDispatch, useAppSelector } from '../hooks/hooks';
import { clearProducts, IfinalProduct } from '../redux/productSlice';

interface cartPageProps{
    vendorId: number;
    totalPrice: number;
};

const CartPage: React.FC<cartPageProps> = ({vendorId, totalPrice}) => {
    const [placeNumber, setPlaceNumber] = useState('');
    const [numberOfPeople, setNumberOfPeople] = useState('');
    const [isModal, setIsModal] = useState(false);
    const [isOpacity, setIsOpacity] = useState(false);
    const [isValidated, setIsValidated] = useState(false);
    const [thanking, setThanking] = useState(false);

    const {products} = useAppSelector(state => state.product);
    const dispatch = useAppDispatch();

    const navigate = useNavigate();

    let order: IOrder = {
        user_id: Telegram.WebApp.initDataUnsafe.user?.id!,
        place: parseInt(placeNumber),
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

    /* if(placeNumber > 0) setBtnOrder(); */

    return (
        <div className='cart'>
            <div className='cart__title-with-icon'>
                <button
                    onClick={() => {
                        setIsModal(true);
                        setIsOpacity(true);
                    }}
                >continue</button>
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
               {/*  <div className={thanking ? 'opacity-block opacity-block_active' : 'opacity-block'}></div>
                <div className={thanking ? 'thanking thanking_active' : 'thanking'}>Спасибо за заказ!</div> */}
            </div>
            <div onClick={() => {setIsOpacity(false); setIsModal(false);}} style={isOpacity ? {'opacity': '0.35', 'pointerEvents': 'all'} : {'opacity' : '0', 'pointerEvents': 'none'}} className='opacity-block'></div>
            <div className='cart__total'>Общая стоимость <span>{totalPrice}₽</span></div>
            <Modal setIsModal={setIsModal} setIsOpacity={setIsOpacity} isModal={isModal} title='Условия заказа' text='Сядьте за любой свободный стол и введи номер, напечатанный на стикере, наклеенном на столе' children={
                <>
                    <MyInput inputValue={placeNumber} setInputValue={setPlaceNumber} isValidated={isValidated} type='number' id='place-number' placeholder='Номер стола' errorText='Выберите номер стола'/>
                    <MyInput inputValue={numberOfPeople} setInputValue={setNumberOfPeople} isValidated={isValidated} type='number' id='people-number' placeholder='Количество гостей' errorText='Выберите количество гостей'/>
                    <button
                        onClick={() => {
                            if(placeNumber.split(/\s+/).join('') === '' || numberOfPeople.split(/\s+/).join('') === ''){
                                setIsValidated(true);
                            } else {
                                setIsModal(false);
                                setIsValidated(false);
                            }
                        }}
                    >Continue</button>
                </>
            } />
        </div>
    );
};

export default CartPage;