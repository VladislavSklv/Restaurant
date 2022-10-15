import React, {useState, useEffect} from 'react';
import { IIngredient, useGetProductDetailsQuery } from '../API/vendorAPI';
import ErrorBlock from './ErrorBlock';
import Loader from './Loader';
import { IChosenIngredients } from './ModalOptions';
import MinMaxBtns from './UI/MinMaxBtns';
import MyCheckbox from './UI/MyCheckbox';
import MyRadio from './UI/MyRadio';

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
    /* const [chosenIngredients, setChosenIngredients] = useState<IChosenIngredients[]>([]);
    const [optionValue, setOptionValue] = useState('');
    const [optionValues, setOptionValues] = useState<string[]>([]);

    useEffect(() => {
        if(optionValue !== undefined && optionValue.length > 0 && details !== undefined && details.ingredientGroups.length > 0){
            setChosenIngredients(prev => {
                if(prev !== undefined && prev.length > 0) {
                    const array = prev.filter(ingredient => ingredient.myId !== JSON.parse(optionValue).myId);
                    array.push(JSON.parse(optionValue));
                    return [...array];
                } else {
                    return [JSON.parse(optionValue)];
                };
            });
        };
    }, [optionValue]);

    useEffect(() => {
        if(optionValues !== undefined && optionValues.length > 0 && details !== undefined && details.ingredientGroups.length > 0){
            setChosenIngredients(prev => {
                if(prev !== undefined && prev.length > 0) {
                    const array = prev.filter(ingredient => ingredient.myId !== JSON.parse(optionValues[0]).myId);
                    optionValues.forEach(option => {
                        array.push(JSON.parse(option));
                    });
                    return array;
                } else {
                    const array: IIngredient[] = [];
                    optionValues.forEach(option => {
                        array.push(JSON.parse(option));
                    });
                    return array;
                }
            });
        };
        if(details !== undefined && !(details.ingredientGroups.length > 0)) {
            const array: IIngredient[] = [];
            optionValues.forEach(item => array.push(JSON.parse(item)));
            setChosenIngredients(array);
        }
    }, [optionValues]); */

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

    console.log(details);

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
                <div className='product-id__value'>
                    Энергитическая ценность в 100 гр. 
                    <div className='product-id__wrapper'>
                        <div className="product-id__info">белки<span>18 г</span></div>
                        <div className="product-id__info">жиры<span>12 г</span></div>
                        <div className="product-id__info">углеводы<span>12 г</span></div>
                        <div className="product-id__info">ккал<span>345</span></div>
                    </div>
                </div>
                {details.ingredientGroups.length > 0 && 
                    <>
                        {details.ingredientGroups.map(group => (
                            <div key={group.id} className='product-id__group'>
                                <div className='product-id__group-title'>{group.name}</div>
                                <div className='product-id__ingredinets'>
                                    {group.ingredients.map(ingredient => (
                                        <div key={ingredient.id} className='product-id__ingredient'>
                                            <MyRadio id={ingredient.id.toString()} inputName={group.name} label={ingredient.name} price={ingredient.price}/>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </>}
                {details.ingredients.length > 0 &&
                    <div className='product-id__group'>
                        <div className='product-id__group-title'>Дополнительно</div>
                        <div className='product-id__ingredinets'>
                            {details.ingredients.map(ingredient=> (
                                <div key={ingredient.id} className='product-id__ingredient'>
                                    <MyCheckbox id={ingredient.id.toString()} inputName={ingredient.name} label={ingredient.name} price={ingredient.price} />
                                </div>
                            ))}
                        </div>
                    </div>
                }
                <div className='product-id__number'>
                    <h2 className='title'>Количество:</h2>
                    <MinMaxBtns numberOf={numberOf} onClickMin={onClickMinHandler} onClickMax={onClickMaxHandler} />
                </div>
            </div>}
        </>
    );
};

export default ProductDetails;