import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { IOrder, IOrderProduct } from '../API/vendorAPI';
import ProductInCart from '../components/ProductInCart';
import MinMaxBtns from '../components/UI/MinMaxBtns';
import { useAppDispatch, useAppSelector } from '../hooks/hooks';
import { clearProducts, IfinalProduct } from '../redux/productSlice';

interface cartPageProps{
    vendorId: number;
};

const CartPage: React.FC<cartPageProps> = ({vendorId}) => {
    const [placeNumber, setPlaceNumber] = useState(1);
    const [thanking, setThanking] = useState(false);
    const [totalPrice, setTotalPrice] = useState(0);

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

    useEffect(() => {
        setBtnOrder();
    }, [placeNumber]);

    useEffect(() => {
        let fullPrice = 0;
        if(products !== undefined && products.length > 0) {
			let price: number = 0;
			let allProductsStringify: string[]  = [];
			let allProducts: IfinalProduct[] = [];
			products.forEach(product => {
				if(!allProductsStringify.includes(JSON.stringify(product))) allProductsStringify.push(JSON.stringify(product));
			});
			allProductsStringify.forEach(product => allProducts.push(JSON.parse(product)));
			allProducts.forEach(product => {
				let thisPrice = product.price
				if(product.ingredients !== undefined && product.ingredients.length > 0) product.ingredients.forEach(ingredient => thisPrice += ingredient.price);
				thisPrice *= product.quantity;
				price += thisPrice;
			});
			fullPrice = price;
		} else fullPrice = 0;
        Telegram.WebApp.MainButton.setParams({'is_visible': true, 'text': `Заказать | ${fullPrice} ₽`});
        setTotalPrice(fullPrice);
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