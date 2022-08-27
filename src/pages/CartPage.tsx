import React from 'react';
import { useGetProductsMenuQuery } from '../API/vendorAPI';
import ProductInCart from '../components/ProductInCart';
import MinMaxBtns from '../components/UI/MinMaxBtns';

const CartPage: React.FC = () => {
    const {data: products} = useGetProductsMenuQuery({vendorId: 81225});

    return (
        <div className='cart'>
            <div className='cart__title-with-icon'>
                <h1 className='title'>Корзина</h1>
                <div><img src="../../trash.svg" alt="cart"/></div>
            </div>
            <div className='cart__wrapper'>
                {products !== undefined && products.map((productTab, index) => (
                    <>
                        {index === 0 && productTab.products.map((product, i) => (
                            <ProductInCart i={i} product={product} />
                        ))}
                    </>
                ))}
            </div>
        </div>
    );
};

export default CartPage;