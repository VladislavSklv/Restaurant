import React, { useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { IProduct } from '../API/vendorAPI';

interface productProps {
    product: IProduct;
    setTotalPrice: React.Dispatch<React.SetStateAction<number>>;
}

const Product:React.FC<productProps> = ({product, setTotalPrice}) => {
    const [numberOf, setNumberOf] = useState(0);
    const productRef = useRef<HTMLDivElement | any>();
    const navigate = useNavigate();

    return (
        <div ref={productRef} className='product'>
            <div 
                onClick={() => navigate(`/details/${product.id}/${numberOf}`)}
                className='product__img'
            ><img src={product.image || 'https://flyclipart.com/thumb2/icono-plato-160306.png'} alt={product.name} />
            </div>
            <div className='product__content'>
                <h2 className='product__name'>{product.name}</h2>
                <p className='product__weight'>{product.weight && `${product.weight} г`}</p>
                {numberOf === 0 
                    ? <button 
                        onClick={() => {
                            setNumberOf(1);
                            setTotalPrice(prev => prev += product.price);
                            productRef.current.style.boxShadow = '0px 3px 12px rgba(0, 0, 0, 0.06), inset 0px -3px 0px #3F8AE0'
                        }}
                        className='product__btn'
                    >{product.price} ₽</button>
                    : 
                    <div className='product__numberof'>
                        <button 
                            className="product__btn_min" 
                            onClick={() => {
                                if(numberOf === 1) {
                                    productRef.current.style.boxShadow = '0px 3px 12px rgba(0, 0, 0, 0.06)';
                                };
                                setNumberOf(prev => prev - 1);
                                setTotalPrice(prev => prev -= product.price);
                            }}
                        ><span></span></button>
                        <div onClick={(e) => e.stopPropagation()}>{numberOf} шт.</div>
                        <button 
                            className="product__btn_min" 
                            onClick={() => {
                                setNumberOf(prev => prev + 1);
                                setTotalPrice(prev => prev += product.price);
                            }}
                        ><span></span><span></span></button>
                    </div>
                }
            </div>
        </div>
    );
};

export default Product;