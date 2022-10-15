import React, {useState} from 'react';
import { useGetProductDetailsQuery } from '../API/vendorAPI';
import ErrorBlock from './ErrorBlock';
import Loader from './Loader';
import MinMaxBtns from './UI/MinMaxBtns';

interface productDetailsProps {
    vendorId: number;
    isDetails: boolean;
    setIsDetails: React.Dispatch<React.SetStateAction<boolean>>;
    detailsId: number;
    setDetailsId: React.Dispatch<React.SetStateAction<number>>;
    setIsOpacity: React.Dispatch<React.SetStateAction<boolean>>;
    number: number;
}

const ProductDetails:React.FC<productDetailsProps> = ({vendorId, detailsId, isDetails, setDetailsId, setIsDetails, setIsOpacity, number}) => {
    const {isLoading, isError, data: details} = useGetProductDetailsQuery({productId: detailsId.toString(), vendorId});
    const [numberOf, setNumberOf] = useState(number);

    const onClickMinHandler = () => {
        if(numberOf > 1 && details !== undefined) {
            setNumberOf(prev => prev - 1);
        };
        if(numberOf === 1 && details !== undefined){
            setNumberOf(0);
        }
    };

    const onClickMaxHandler = () => {
        if(numberOf > 0 && details !== undefined){
            setNumberOf(prev => prev + 1);
        };
        if(numberOf === 0 && details !== undefined){
            setNumberOf(prev => prev + 1);
        }
    };

    return (
        <>
            {isLoading && <Loader/>}
            {isError && <ErrorBlock/>}
            {details !== undefined && 
            <div className='product-id'>
                <div className='product-id__img'>
                    <img src={details.image || '../images/food.svg'} alt={details.name} />
                    <div className='cross'><span></span><span></span></div>
                    <div className='product-id__weight'>{details.weight} гр</div>
                </div>
                <h1 className='product-id__title'>{details.name}</h1>
                <p className='product-id__descr'>{details.description}</p>
                {/* {(details.ingredientGroups.length > 0 || details.ingredients.length > 0) && <h2 className='title'>Выберите состав</h2>}
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
                {details.ingredients.length > 0 && <div className={'modal__href'}><span>Дополнительно</span>
                    <button 
                        className='product-id__btn'
                        onClick={() => {
                            setIsModalComp(true);
                            sliderRef.current.slickGoTo(details.ingredientGroups.length);
                        }}
                    >Добавить</button>
                </div>} */}
                {/* {details.ingredients.length > 0 && myId !== undefined && id !== undefined && <ModalOptions finalChosenIngredients={finalChosenIngredients} setFinalChosenIngredients={setFinalChosenIngredients} sliderRef={sliderRef} myId={parseInt(myId)} id={id} isModalComp={isModalComp} setIsModalComp={setIsModalComp} ingredientsMainGroup={details.ingredientGroups} ingredientsOptional={details.ingredients}/>} */}
                <div className='product-id__number'>
                    <h2 className='title'>Количество</h2>
                    <MinMaxBtns numberOf={numberOf} onClickMin={onClickMinHandler} onClickMax={onClickMaxHandler} />
                </div>
            </div>}
        </>
    );
};

export default ProductDetails;