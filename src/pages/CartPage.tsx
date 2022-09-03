import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { IOrder, IOrderProduct } from '../API/vendorAPI';
import ProductInCart from '../components/ProductInCart';
import MinMaxBtns from '../components/UI/MinMaxBtns';
import { useAppDispatch, useAppSelector } from '../hooks/hooks';
import { clearProducts } from '../redux/productSlice';

interface cartPageProps{
    vendorId: number;
};

const CartPage: React.FC<cartPageProps> = ({vendorId}) => {
    const {products} = useAppSelector(state => state.product);
    const [placeNumber, setPlaceNumber] = useState(1);
    const [thanking, setThanking] = useState(false);
    const dispatch = useAppDispatch();

    const navigate = useNavigate();

    let order: IOrder = {
        user_id: Telegram.WebApp.initDataUnsafe.user?.id!,
        place: placeNumber,
        vendor_id: vendorId,
        products: [],
    };

    const setBtnOrder = () => {
        Telegram.WebApp.onEvent('mainButtonClicked', () => {
            fetch(`https://etoolz.ru/api/v1/vendor/${vendorId}/orde`,{
                body: JSON.stringify(order),
                method: 'POST'
            }).then(() => {
                Telegram.WebApp.MainButton.setParams({'color': '#4986CC', 'is_visible': false, 'text_color': '#ffffff', 'text': 'Заказ выполнен!', 'is_active': false}).disable();
            }).then(() => {
                setThanking(true);
            }).then(() =>{
                setTimeout(() => {
                    Telegram.WebApp.close();
                }, 1500)
            });
        });
    };

    useEffect(() => {
        setBtnOrder();
    }, [placeNumber]);

    useEffect(() => {
        let totalPrice = 0;
        products.forEach(product => {
            totalPrice += product.price * product.quantity;
        });
        order.products = products.map(product => {
            const {image, myId, id, ...rest} = product;
            let array: IOrderProduct = {...rest, id: parseInt(product.id)};
            return array;
        });
        Telegram.WebApp.MainButton.setParams({'is_visible': true, 'text': `Заказать | ${totalPrice} ₽`});
    }, [products]);

    useEffect(() => {
        console.log(order);
    }, [order]);

    const onClickMinHandler = () => {
        setPlaceNumber(prev => {
            if(prev === 1) return prev;
            else return prev - 1;
        });
    };

    const onClickMaxHandler = () => {
        setPlaceNumber(prev => prev + 1);
    };

    if(placeNumber > 0) setBtnOrder();

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
                <div className={thanking ? 'opacity-block opacity-block_active' : 'opacity-block'}></div>
                <div className={thanking ? 'thanking thanking_active' : 'thanking'}>Спасибо за заказ!</div>
            </div>
        </div>
    );
};

export default CartPage;