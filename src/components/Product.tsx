import React, { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { IProduct } from '../API/vendorAPI';
import { useAppDispatch, useAppSelector } from '../hooks/hooks';
import { addProduct, IfinalProduct, removeProduct } from '../redux/productSlice';
import MinMaxBtns from './UI/MinMaxBtns';

interface productProps {
    product: IProduct;
    setTotalPrice: React.Dispatch<React.SetStateAction<number>>;
}

const Product:React.FC<productProps> = ({product, setTotalPrice}) => {
    const [numberOf, setNumberOf] = useState(0);
    const productRef = useRef<HTMLDivElement | any>();
    const navigate = useNavigate();
    const [myId, setMyId] = useState(1);

    const dispatch = useAppDispatch();
    const {products} = useAppSelector(state => state.product);

    const onClickMinHandler = () => {
        if(numberOf === 1) {
            productRef.current.style.boxShadow = '0px 3px 12px rgba(0, 0, 0, 0.06)';
        };
        setNumberOf(prev => prev - 1);
        setTotalPrice(prev => prev -= product.price);
        dispatch(removeProduct({id: product.id, myId}));
    };

    const onClickMaxHandler = () => {
        const p = new Promise((resolve, reject) => {
            dispatch(addProduct({
                myId: myId,
                id: product.id,
                name: product.name,
                price: product.price,
                quantity: 1,
                image: product.image,
                ingredients: [],
            }));
            resolve(true);
            reject(false);
        });
        setNumberOf(prev => prev + 1);
        setTotalPrice(prev => prev += product.price);
        p.then((data) => {
            if(data) {
                setMyId(Date.now());
            }
        })
    };

    return (
        <div ref={productRef} className='product'>
            <div 
                onClick={() => navigate(`/details/${product.id}/${myId}`)}
                className='product__img'
            ><img src={product.image || 'https://flyclipart.com/thumb2/icono-plato-160306.png'} alt={product.name} />
            </div>
            <div className='product__content'>
                <h2 className='product__name'>{product.name}</h2>
                <p className='product__weight'>{product.weight && `${product.weight} г`}</p>
                {numberOf === 0 
                    ? <button 
                        onClick={() => {
                            const p1 = new Promise((resolve, reject) => {
                                dispatch(addProduct({
                                    myId: myId,
                                    id: product.id,
                                    name: product.name,
                                    price: product.price,
                                    quantity: 1,
                                    image: product.image,
                                    ingredients: [],
                                }));
                                resolve(true);
                                reject(false);
                            });
                            setNumberOf(1);
                            setTotalPrice(prev => prev += product.price);
                            productRef.current.style.boxShadow = '0px 3px 12px rgba(0, 0, 0, 0.06), inset 0px -3px 0px #3F8AE0';
                            p1.then((data) => {
                                if(data) {
                                    setMyId(Date.now());
                                }
                            })
                        }}
                        className='product__btn'
                    >{product.price} ₽</button>
                    : <MinMaxBtns numberOf={numberOf} onClickMax={onClickMaxHandler} onClickMin={onClickMinHandler} />
                }
            </div>
        </div>
    );
};

export default Product;