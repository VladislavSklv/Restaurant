import React, {useEffect, useState, useRef} from 'react';
import { useNavigate } from 'react-router-dom';
import { useGetProductDetailsQuery } from '../API/vendorAPI';
import { useAppDispatch } from '../hooks/hooks';
import { addProduct } from '../redux/productSlice';
import DragLine from './DragLine';
import ErrorBlock from './ErrorBlock';
import IngredientsForm from './IngredientsForm';
import Loader from './Loader';
import Message from './Message';
import MinMaxBtns from './UI/MinMaxBtns';
import { useSwipeable } from 'react-swipeable';

interface productDetailsProps {
    vendorId: number;
    isDetails: boolean;
    setIsDetails: React.Dispatch<React.SetStateAction<boolean>>;
    detailsId: number;
    setIsOpacity: React.Dispatch<React.SetStateAction<boolean>>;
    isCart: boolean;
    setIsCart: React.Dispatch<React.SetStateAction<boolean>>;
}

export interface ChosenIngredientI{
    id: number;
    name: string;
    inputName: string;
    price: number;
}

const ProductDetails:React.FC<productDetailsProps> = ({vendorId, isDetails, detailsId, setIsDetails, setIsOpacity, isCart, setIsCart}) => {
    const {isLoading, isError, data: details} = useGetProductDetailsQuery({productId: detailsId.toString(), vendorId});
    const [numberOf, setNumberOf] = useState(1);
    const [fullPrice, setFullPrice] = useState(0);
    const [chosenIngredients, setChosenIngredients] = useState<ChosenIngredientI[]>([]);
    const [isAllIngredients, setIsAllIngredients] = useState(false);
    const [isValidation, setIsValidation] = useState(false);
    const [isMessage, setIsMessage] = useState(false);
    const [isScrolledTop, setIsScrolledTop] = useState(true);
    const [isSwiped, setIsSwiped] = useState(false);
    const detailsPageRef = useRef<HTMLDivElement>(null);
    const formRef = useRef<HTMLFormElement>(null);

    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    /* Counting full price */
    useEffect(() => {
        if(details !== undefined){
            let allIngredientsPrices = 0;
            chosenIngredients.forEach(ingredient => {
                allIngredientsPrices += ingredient.price;
            });

            setFullPrice((details.price + allIngredientsPrices) * numberOf);
        }
    }, [numberOf, chosenIngredients, details]);

    /* Reset details modal */
    useEffect(() => {
        if(!isDetails){
            setNumberOf(1);
            setChosenIngredients([]);
            setIsValidation(false);
            setIsMessage(false);
            formRef.current?.reset();
        }
    }, [isDetails]);

    /* Checking if all needed ingredients are chosen */
    useEffect(() => {
        let neededIngredients = chosenIngredients.filter(ingredient => ingredient.inputName !== ingredient.name);
        if(details !== undefined && neededIngredients.length === details.ingredientGroups.length){
            setIsAllIngredients(true);
        } else {
            setIsAllIngredients(false);
        }
    }, [chosenIngredients, isDetails, details]);

    /* Handlers */
    const onClickMinHandler = () => {
        if(numberOf > 2 && details !== undefined) {
            setNumberOf(prev => prev - 1);
        };
        if(numberOf === 2 && details !== undefined){
            setNumberOf(1);
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

    /* Swipe Handlers */
    const handlers = useSwipeable({
        onSwiping: (e) => {
            if(isScrolledTop && e.dir === "Down"){
                setIsSwiped(true);
                if(isSwiped){
                    setIsDetails(false);
                    setIsOpacity(false);
                }
            }
        }
    })

    const close = () => {
        setIsDetails(false);
        setIsOpacity(false);
    };

    /* Setting telegram main button */
    useEffect(() => {
        if(isDetails){
            if(!window.Telegram.WebApp.MainButton.isVisible && fullPrice !== 0)  window.Telegram.WebApp.MainButton.show();
            if(fullPrice !== 0 && (isAllIngredients || !details?.hasIngredients)) window.Telegram.WebApp.MainButton.text = `Добавить в корзину ${fullPrice}₽`;
            else if(fullPrice !== 0) window.Telegram.WebApp.MainButton.text = `Выберите опции ${fullPrice}₽`;
        }
    }, [isDetails, fullPrice, isAllIngredients]);

	const mainBtn = () => {
		if(isDetails === false){
			setIsCart(true);
			navigate('/cart');
		} else {
            if(isAllIngredients && details !== undefined){
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
                window.Telegram.WebApp.HapticFeedback.notificationOccurred('error');
                setIsValidation(true);
                setIsMessage(true);
                if(formRef.current !== undefined && formRef.current !== null){
                    if(formRef.current !== undefined && formRef.current !== null && detailsPageRef.current !== null){
                        const childNodesArray = Object.values(formRef.current.childNodes) as HTMLElement[];
                        let checker = true;
                        for(let j = 0; j < childNodesArray.length; j++){
                            if(childNodesArray[j].classList.contains('validated')){
                                detailsPageRef.current?.scrollBy(0, childNodesArray[j].getBoundingClientRect().y - 15);
                                checker = false;
                                break;
                            }
                        }
                        if(checker) detailsPageRef.current?.scrollBy(0, childNodesArray[0].getBoundingClientRect().y - 15);
                    }
                }
            };
        }
	};

    useEffect(() => {
        if(isCart === false) {
            window.Telegram.WebApp.onEvent('mainButtonClicked', mainBtn);
            return () => {
                window.Telegram.WebApp.offEvent('mainButtonClicked', mainBtn);
            };
        }
	}, [mainBtn, isCart, chosenIngredients, numberOf, isAllIngredients, details, isValidation]);

    /* Haptic feedback */
    useEffect(() => {
        if(isDetails) window.Telegram.WebApp.HapticFeedback.selectionChanged();
    }, [numberOf, chosenIngredients]);

    return (
        <>
            {isLoading && <Loader/>}
            {isError && <ErrorBlock/>}
            {details !== undefined && 
            <div 
                {...handlers} style={isDetails ? {'bottom': '0'} : {'bottom': '-100%'}} 
                className='product-id'
                ref={detailsPageRef}
                onScroll={(e: any) => {
                    if(e.target.scrollTop === 0) {
                        setIsScrolledTop(true);
                    }
                    else {
                        setIsScrolledTop(false);
                        setIsSwiped(false);
                    };
                }}
            >
                <div className='product-id__img'>
                    <img src={details.image || '../images/food.svg'} alt={details.name} />
                    {details.weight && <div className='product-id__weight'>{details.weight} гр</div>}
                </div>
                <h2 onClick={() => setIsMessage(true)} className='product-id__title'>{details.name}</h2>
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
                <DragLine />
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