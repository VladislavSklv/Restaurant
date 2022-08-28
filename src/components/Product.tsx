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

    const finalProduct: IfinalProduct = {
        myId: myId,
        id: product.id,
        name: product.name,
        price: product.price,
        quantity: 1,
        image: product.image,
        ingredients: [],
    };
    const dispatch = useAppDispatch();
    const {products: finalProducts} = useAppSelector(state => state.product);

    useEffect(() => {
        finalProduct.myId = myId;
    }, [myId]);

    const onClickMinHandler = () => {
        if(numberOf === 1) {
            productRef.current.style.boxShadow = '0px 3px 12px rgba(0, 0, 0, 0.06)';
        };
        setNumberOf(prev => prev - 1);
        setTotalPrice(prev => prev -= product.price);
        dispatch(removeProduct({id: product.id, myId}));
    };

    const onClickMaxHandler = () => {
        setMyId(Date.now());
        setNumberOf(prev => prev + 1);
        setTotalPrice(prev => prev += product.price);
        dispatch(addProduct(finalProduct));
    };

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
                            setMyId(Date.now());
                            setNumberOf(1);
                            setTotalPrice(prev => prev += product.price);
                            productRef.current.style.boxShadow = '0px 3px 12px rgba(0, 0, 0, 0.06), inset 0px -3px 0px #3F8AE0';
                            dispatch(addProduct(finalProduct));
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