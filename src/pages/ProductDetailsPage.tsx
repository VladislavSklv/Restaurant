import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useGetProductDetailsQuery } from '../API/vendorAPI';

interface productDetailsPageProps{
    vendorId: number;
}

const ProductDetailsPage: React.FC<productDetailsPageProps> = ({vendorId}) => {
    const {id, numberOf} = useParams();
    const {isLoading, isError, data: details} = useGetProductDetailsQuery({productId: id!, vendorId});
    const [newNumberOf, setNewNumberOf] = useState(parseInt(numberOf!));
    const [price, setPrice] = useState(newNumberOf * details!.price);

    useEffect(() => {
        if(details != undefined && numberOf != undefined) {
            Telegram.WebApp.MainButton.text = `Добавить к заказу | ${price} ₽`
        } 
        console.log(price);
    }, [price]);

    return (
        <>
            {details !== undefined && 
            <div className='product-id'>
                <div className='product-id__img'><img src={details.image} alt={details.name} /></div>
                <h1 className='product-id__title'>{details.name}</h1>
                {details.weight 
                    ? <p className='product-id__descr'>{details.weight} г &#8226; {details.description}</p>
                    : <p className='product-id__descr'>{details.description}</p>
                }
                <h2 className='title'>Выберите количество</h2>
                <div className='product__numberof'>
                    <button 
                        className="product__btn_min"
                        onClick={() => {
                            if(newNumberOf > 0) {
                                setNewNumberOf(prev => prev - 1);
                                setPrice(prev => prev -= details.price)
                            }
                        }} 
                    ><span></span></button>
                    <div onClick={(e) => e.stopPropagation()}>{newNumberOf} шт.</div>
                    <button 
                        className="product__btn_min"
                        onClick={() => {
                            setNewNumberOf(prev => prev + 1);
                            setPrice(prev => prev += details.price)
                        }} 
                    ><span></span><span></span></button>
                </div>
                <h2 className='title'>Выберите состав</h2>
                {details.ingredientGroups.length > 0 && details.ingredientGroups.map((ingredient, i) => (
                    <div key={details.id + details.image + i} className='modal__href'><span>{ingredient.name}</span><button className='product-id__btn'>Выбрать</button></div>
                ))}
                {details.ingredients.length > 0 && <div className='modal__href'><span>Дополнительно</span><button className='product-id__btn'>Выбрать</button></div>}
            </div>}
        </>
    );
};

export default ProductDetailsPage;