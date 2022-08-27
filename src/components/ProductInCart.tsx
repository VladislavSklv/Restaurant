import React, { useState } from 'react';
import { IProduct } from '../API/vendorAPI';
import MinMaxBtns from './UI/MinMaxBtns';

interface prodcutInCartProps {
    i: number;
    product: IProduct;
}

const ProductInCart:React.FC<prodcutInCartProps> = ({product, i}) => {
    const [numberOf, setNumberOf] = useState(1);

    const onClickMinHandler = () => {
        if(numberOf != 0) {
            setNumberOf(prev => prev - 1);
        };
    };

    const onClickMaxHandler = () => {
        setNumberOf(prev => prev + 1);
    };

    return (
        <div className='cart-item'>
            <div className='cart-item__img'><img src={product.image || 'https://flyclipart.com/thumb2/icono-plato-160306.png'} alt={product.name} /></div>
            <div className='cart-item__content'>
                <h2 className='cart-item__title'>{product.name} <span className='cart-item__price'>{product.price} ₽</span></h2>
                {i === 0 && <p className='cart-item__ingredients'>Двойная порция курицы • Гречневая • Сингапурский</p>}
                <MinMaxBtns onClickMin={onClickMinHandler} onClickMax={onClickMaxHandler} numberOf={numberOf} noText={true} />
            </div>
        </div>
    );
};

export default ProductInCart;