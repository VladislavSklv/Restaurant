import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useGetProductDetailsQuery } from '../API/vendorAPI';
import ModalComposition from '../components/ModalComposition';
import MinMaxBtns from '../components/UI/MinMaxBtns';
import { useAppSelector } from '../hooks/hooks';
import { IfinalProduct } from '../redux/productSlice';

interface productDetailsPageProps{
    vendorId: number;
}

const ProductDetailsPage: React.FC<productDetailsPageProps> = ({vendorId}) => {
    const {id, myId} = useParams();
    const {isLoading, isError, data: details} = useGetProductDetailsQuery({productId: id!, vendorId});
    const [newNumberOf, setNewNumberOf] = useState(1);
    const [price, setPrice] = useState(0);
    const [isModalComp, setIsModalComp] = useState(false);

    const {products} = useAppSelector(state => state.product);
    let thisProduct: IfinalProduct;
    products.forEach(product => {
        if(myId !== undefined && product.id === id && product.myId === parseInt(myId)) thisProduct = product;
    });

    useEffect(() => {
        if(thisProduct !== undefined) setNewNumberOf(thisProduct.quantity);
    }, [products])

    useEffect(() => {
        if(details !== undefined){
            setPrice(newNumberOf * details!.price);
        };
    }, [details]);

    useEffect(() => {
        if(details != undefined && price > 0) {
            Telegram.WebApp.MainButton.isVisible = true;
            Telegram.WebApp.MainButton.text = `Добавить к заказу | ${price} ₽`
        } else {
            Telegram.WebApp.MainButton.isVisible = false;
        };
    }, [price]);

    const onClickMinHandler = () => {
        if(newNumberOf > 0) {
            setNewNumberOf(prev => prev - 1);
            setPrice(prev => prev -= details!.price)
        };
    };

    const onClickMaxHandler = () => {
        setNewNumberOf(prev => prev + 1);
        setPrice(prev => prev += details!.price);
    };

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
                <MinMaxBtns numberOf={newNumberOf} onClickMin={onClickMinHandler} onClickMax={onClickMaxHandler} />
                <h2 className='title'>Выберите состав</h2>
                {details.ingredientGroups.length > 0 && details.ingredientGroups.map((ingredient, i) => (
                    <div key={details.id + details.image + i} className='modal__href'><span>{ingredient.name}</span>
                        <button 
                            className='product-id__btn'
                            onClick={() => {
                                setIsModalComp(true);
                            }}
                        >Выбрать</button>
                    </div>
                ))}
                {details.ingredients.length > 0 && <div className='modal__href'><span>Дополнительно</span>
                    <button 
                        className='product-id__btn'
                        onClick={() => {
                            setIsModalComp(true);
                        }}
                    >Добавить</button>
                </div>}
                {details.ingredients.length > 0 && myId !== undefined && id !== undefined && <ModalComposition myId={parseInt(myId)} id={id} isModalComp={isModalComp} setIsModalComp={setIsModalComp} ingredientsMainGroup={details.ingredientGroups} ingredientsOptional={details.ingredients}/>}
            </div>}
        </>
    );
};

export default ProductDetailsPage;