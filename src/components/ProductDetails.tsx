import React, {useEffect, useState, useRef} from 'react';
import { useGetProductDetailsQuery } from '../API/vendorAPI';
import { useAppDispatch } from '../hooks/hooks';
import { addProduct } from '../redux/productSlice';
import DragLine from './DragLine';
import ErrorBlock from './ErrorBlock';
import IngredientsForm from './IngredientsForm';
import Loader from './Loader';
import Message from './Message';
import MinMaxBtns from './UI/MinMaxBtns';

interface productDetailsProps {
    vendorId: number;
    isDetails: boolean;
    setIsDetails: React.Dispatch<React.SetStateAction<boolean>>;
    detailsId: number;
    setIsOpacity: React.Dispatch<React.SetStateAction<boolean>>;
}

export interface ChosenIngredientI{
    id: number;
    name: string;
    inputName: string;
    price: number;
}

const ProductDetails:React.FC<productDetailsProps> = ({vendorId, isDetails, detailsId, setIsDetails, setIsOpacity}) => {
    const {isLoading, isError, data: details} = useGetProductDetailsQuery({productId: detailsId.toString(), vendorId});
    const [numberOf, setNumberOf] = useState(1);
    const [chosenIngredients, setChosenIngredients] = useState<ChosenIngredientI[]>([]);
    const [isAllIngredients, setIsAllIngredients] = useState(false);
    const [isValidation, setIsValidation] = useState(false);
    const [isMessage, setIsMessage] = useState(false);
    const [fullOpen, setFullOpen] = useState(false);
    const formRef = useRef<HTMLFormElement>(null);

    const dispatch = useAppDispatch();

    /* Reset details modal */
    useEffect(() => {
        setNumberOf(1);
        setChosenIngredients([]);
        setIsValidation(false);
        setIsMessage(false);
        formRef.current?.reset();
    }, [isDetails]);

    /* Checking if all needed ingredients are chosen */
    useEffect(() => {
        let neededIngredients = chosenIngredients.filter(ingredient => ingredient.inputName !== ingredient.name);
        if(details !== undefined && neededIngredients.length === details.ingredientGroups.length){
            setIsAllIngredients(true);
        } else {
            setIsAllIngredients(false);
        }
    }, [chosenIngredients]);

    /* Handlers */
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

    const close = () => {
        setIsDetails(false);
        setIsOpacity(false);
        setFullOpen(false);
    };

    return (
        <>
            {isLoading && <Loader/>}
            {isError && <ErrorBlock/>}
            {details !== undefined && 
            <div style={isDetails ? {'bottom': '0'} : {'bottom': '-100%'}} className={fullOpen ? 'product-id product-id__full' : 'product-id'}>
                <div className='product-id__img'>
                    <img src={details.image || '../images/food.svg'} alt={details.name} />
                    <div className='product-id__weight'>{details.weight} гр</div>
                </div>
                <h2 className='product-id__title'>{details.name}</h2>
                <button
                    onClick={() => {
                        if(isAllIngredients){
                            dispatch(addProduct({
                                myId: Date.now(),
                                id: details.id,
                                image: details.image,
                                ingredients: chosenIngredients,
                                name: details.name,
                                price: details.price,
                                quantity: numberOf
                            }));
                            close();
                        } else {
                            setIsValidation(true);
                            setIsMessage(true);
                        };
                    }}
                >Add</button>
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
                <IngredientsForm formRef={formRef} details={details} isDetails={isDetails} isValidation={isValidation} setChosenIngredients={setChosenIngredients}/>
                {isDetails && <div className='product-id__number'>
                    <h2 className='title'>Количество:</h2>
                    <MinMaxBtns numberOf={numberOf} onClickMin={onClickMinHandler} onClickMax={onClickMaxHandler} />
                </div>}
                <DragLine close={close} fullOpen={fullOpen} setFullOpen={setFullOpen} />
                <div 
                    className='cross'
                    onClick={close}
                ><span></span><span></span></div>
                <Message isError={true} isActive={isMessage} setIsActive={setIsMessage}/>
            </div>}
        </>
    );
};

export default ProductDetails;