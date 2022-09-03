import React, { useEffect, useRef, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { IIngredient, useGetProductDetailsQuery } from '../API/vendorAPI';
import ErrorBlock from '../components/ErrorBlock';
import Loader from '../components/Loader';
import ModalOptions from '../components/ModalOptions';
import MinMaxBtns from '../components/UI/MinMaxBtns';
import { useAppDispatch, useAppSelector } from '../hooks/hooks';
import { addIngredientsToProductByMyId, decrementQuantity, filterProducts, IfinalProduct, incrementQuantity, removeProduct } from '../redux/productSlice';

interface productDetailsPageProps{
    vendorId: number;
}

const ProductDetailsPage: React.FC<productDetailsPageProps> = ({vendorId}) => {
    const {id, myId} = useParams();
    const {isLoading, isError, data: details} = useGetProductDetailsQuery({productId: id!, vendorId});
    const [numberOf, setNumberOf] = useState(1);
    const [isModalComp, setIsModalComp] = useState(false);
    const [isAnim, setIsAnim] = useState(false);
    const [price, setPrice] = useState(details !== undefined ? details.price : 0);
    const [finalChosenIngredients, setFinalChosenIngredients] = useState<IIngredient[]>([]);
    const sliderRef = useRef<any>(null);

    const {products} = useAppSelector(state => state.product);
    const dispatch = useAppDispatch();

    const navigate = useNavigate();

    useEffect(() => {
        if(details?.hasIngredients && details.ingredientGroups.length > 0){
            setIsModalComp(true);
        };

        if(details !== undefined && details.price !== undefined){
            setPrice(details.price);
        }

        if(details?.hasIngredients && details.ingredientGroups.length === 0){
            const p = new Promise((resolve, reject) => {
                window.scrollTo(0, document.body.scrollHeight);
                resolve(true);
                reject(false);
            }).then(() => setIsAnim(true));
        };
    }, [details]);

    useEffect(() => {
        if(details !== undefined && isModalComp === false && numberOf > 0) {
            Telegram.WebApp.MainButton.setParams({'color': '#4986CC', 'is_visible': true, 'text_color': '#ffffff', 'text': `Добавить к заказу | ${price} ₽`, 'is_active': true})
            .enable();
        };
    }, [price, isModalComp, numberOf]);

    if(isModalComp === false) {
        Telegram.WebApp.MainButton.onClick(() => {
            dispatch(filterProducts());
            navigate('/');
        });
    };

    if (isModalComp === true && id !== undefined && myId !== undefined) {
        Telegram.WebApp.MainButton.onClick(() => {
            setIsModalComp(false);
            dispatch(addIngredientsToProductByMyId({ingredients: finalChosenIngredients!, id, myId: parseInt(myId)}));
            navigate('');
        });
    }

    const onClickMinHandler = () => {
        if(numberOf > 1 && details !== undefined) {
            setNumberOf(prev => prev - 1);
            setPrice(prev => prev -= details.price);
            if(id !== undefined && myId !== undefined) dispatch(decrementQuantity({id, myId: parseInt(myId)}));
        }
    };

    const onClickMaxHandler = () => {
        if(numberOf > 0 && details !== undefined){
            setNumberOf(prev => prev + 1);
            setPrice(prev => prev += details.price);
            if(id !== undefined && myId !== undefined) dispatch(incrementQuantity({id, myId: parseInt(myId)}));
        }
    };

    return (
        <>
            {isLoading && <Loader/>}
            {isError && <ErrorBlock/>}
            {details !== undefined && 
            <div className='product-id'>
                <div className='product-id__img'><img src={details.image || 'https://flyclipart.com/thumb2/icono-plato-160306.png'} alt={details.name} /></div>
                <h1 className='product-id__title'>{details.name}</h1>
                {details.weight 
                    ? <p className='product-id__descr'>{details.weight} г &#8226; {details.description}</p>
                    : <p className='product-id__descr'>{details.description}</p>
                }
                <h2 className='title'>Выберите количество</h2>
                <MinMaxBtns numberOf={numberOf} onClickMin={onClickMinHandler} onClickMax={onClickMaxHandler} />
                {(details.ingredientGroups.length > 0 || details.ingredients.length > 0) && <h2 className='title'>Выберите состав</h2>}
                {details.ingredientGroups.length > 0 && details.ingredientGroups.map((ingredient, i) => (
                    <div key={details.id + details.image + i} className='modal__href'><span>{ingredient.name}</span>
                        <button 
                            className='product-id__btn'
                            onClick={() => {
                                setIsModalComp(true);
                                sliderRef.current.slickGoTo(i);
                            }}
                        >Выбрать</button>
                    </div>
                ))}
                {details.ingredients.length > 0 && <div className={isAnim ? 'modal__href focus-anim' : 'modal__href'}><span>Дополнительно</span>
                    <button 
                        className='product-id__btn'
                        onClick={() => {
                            setIsModalComp(true);
                            sliderRef.current.slickGoTo(details.ingredientGroups.length);
                        }}
                    >Добавить</button>
                </div>}
                {details.ingredients.length > 0 && myId !== undefined && id !== undefined && <ModalOptions finalChosenIngredients={finalChosenIngredients} setFinalChosenIngredients={setFinalChosenIngredients} sliderRef={sliderRef} myId={parseInt(myId)} id={id} isModalComp={isModalComp} setIsModalComp={setIsModalComp} ingredientsMainGroup={details.ingredientGroups} ingredientsOptional={details.ingredients}/>}
            </div>}
        </>
    );
};

export default ProductDetailsPage;