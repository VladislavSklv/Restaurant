import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { IOrder } from '../API/vendorAPI';
import Modal from '../components/Modal';
import PayMethodList from '../components/PayMethodList';
import ProductInCart from '../components/ProductInCart';
import MyInput from '../components/UI/MyInput';
import { useAppDispatch, useAppSelector } from '../hooks/hooks';
import { clearProducts } from '../redux/productSlice';

interface cartPageProps{
    vendorId: number;
    totalPrice: number;
};

const CartPage: React.FC<cartPageProps> = ({vendorId, totalPrice}) => {
    const [placeNumber, setPlaceNumber] = useState('');
    const [numberOfPeople, setNumberOfPeople] = useState('');
    const [isModal1, setIsModal1] = useState(false);
    const [isModal2, setIsModal2] = useState(false);
    const [isOpacity, setIsOpacity] = useState(false);
    const [isValidated, setIsValidated] = useState(false);
    const [isPaymentChosen, setIsPaymentChosen] = useState(false);
    const formsRef = useRef<HTMLFormElement>(null);

    const {products} = useAppSelector(state => state.product);
    const dispatch = useAppDispatch();

    const navigate = useNavigate();

    /* Final order object */
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
            })
        });
    };

    /* function witch close modals */
    const close = () => {
        setIsOpacity(false); 
        setIsModal1(false);
        setIsModal2(false);
        setIsValidated(false);
        setIsPaymentChosen(false);
        formsRef.current?.reset();
    }

    return (
        <div className='cart'>
            <div className='cart__title-with-icon'>
                <button
                    onClick={() => {
                        setIsModal1(true);
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
            </div>
            <div 
                onClick={() => close()} 
                style={isOpacity ? {'opacity': '0.35', 'pointerEvents': 'all'} : {'opacity' : '0', 'pointerEvents': 'none'}} 
                className='opacity-block'
            ></div>
            <div className='cart__total'>Общая стоимость <span>{totalPrice}₽</span></div>
            <Modal close={close} isModal={isModal1} title='Условия заказа' text='Сядьте за любой свободный стол и введи номер, напечатанный на стикере, наклеенном на столе' children={
                <>
                    <form ref={formsRef}>
                        <MyInput inputValue={placeNumber} setInputValue={setPlaceNumber} isValidated={isValidated} type='number' id='place-number' placeholder='Номер стола' errorText='Выберите номер стола'/>
                        <MyInput inputValue={numberOfPeople} setInputValue={setNumberOfPeople} isValidated={isValidated} type='number' id='people-number' placeholder='Количество гостей' errorText='Выберите количество гостей'/>
                    </form>
                    <button
                        onClick={() => {
                            if(placeNumber.split(/\s+/).join('') === '' || numberOfPeople.split(/\s+/).join('') === ''){
                                setIsValidated(true);
                            } else {
                                setIsModal1(false);
                                setIsValidated(false);
                                setIsModal2(true);
                            }
                        }}
                    >Continue</button>
                </>
            } />
            <Modal close={close} isModal={isModal2} title='Способ оплаты' children={<PayMethodList formsRef={formsRef} isRadioChecked={isPaymentChosen} setIsRadioChecked={setIsPaymentChosen} setIsModal2={setIsModal2} setIsOpacity={setIsOpacity} setIsValidated={setIsValidated} />} />
        </div>
    );
};

export default CartPage;