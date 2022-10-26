import React, {useEffect, useState, useRef} from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch } from '../hooks/hooks';
import { addProduct } from '../redux/productSlice';
import DragLine from './DragLine';
import ModifiersForm from './ModifiersForm';
import Message from './Message';
import MinMaxBtns from './UI/MinMaxBtns';
import { useSwipeable } from 'react-swipeable';
import { IModifier, IModifierScheme, IProduct, mainArray } from '../API/vendorAPI';

interface productDetailsProps {
    isDetails: boolean;
    setIsDetails: React.Dispatch<React.SetStateAction<boolean>>;
    detailsId: number;
    setIsOpacity: React.Dispatch<React.SetStateAction<boolean>>;
    isCart: boolean;
    setIsCart: React.Dispatch<React.SetStateAction<boolean>>;
    products: mainArray[];
}

export interface ChosenIngredientI{
    id: number;
    name: string;
    inputName: string;
    price: number;
}

const ProductDetails:React.FC<productDetailsProps> = ({products, isDetails, detailsId, setIsDetails, setIsOpacity, isCart, setIsCart}) => {
    const [details, setDetails] = useState<IProduct>();
    const [numberOf, setNumberOf] = useState(1);
    const [fullPrice, setFullPrice] = useState(0);
    const [chosenModifiers, setChosenModifiers] = useState<ChosenIngredientI[]>([]);
    const [isAllModifiers, setIsAllModifiers] = useState(false);
    const [requiredModifiers, setRequiredModifiers] = useState<IModifierScheme[]>([]);
    const [isValidation, setIsValidation] = useState(false);
    const [isMessage, setIsMessage] = useState(false);
    const [isScrolledTop, setIsScrolledTop] = useState(true);
    const [isSwiped, setIsSwiped] = useState(false);
    const detailsPageRef = useRef<HTMLDivElement>(null);
    const formRef = useRef<HTMLFormElement>(null);

    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    /* Getting this details */
    useEffect(() => {
        if(products !== undefined){
            products.forEach(productsTab => {
                productsTab.products.forEach(product => {
                    if(product.id === detailsId) setDetails(product);
                });
            });
        };
    }, [detailsId, isDetails]);

    /* Counting full price */
    useEffect(() => {
        if(details !== undefined){
            let allModifiersPrices = 0;
            chosenModifiers.forEach(modifier => {
                allModifiersPrices += modifier.price;
            });

            setFullPrice((details.price + allModifiersPrices) * numberOf);
        }
    }, [numberOf, chosenModifiers, details]);

    /* Reset details modal */
    useEffect(() => {
        if(!isDetails){
            setNumberOf(1);
            setChosenModifiers([]);
            setRequiredModifiers([]);
            setIsValidation(false);
            setIsMessage(false);
            formRef.current?.reset();
        }
    }, [isDetails]);

    /* Splitting modifiers */
    useEffect(() => {
        let required: IModifierScheme[] = [];
        if(details !== undefined && details.modifierScheme !== undefined && details.modifierScheme.length > 0){
            details.modifierScheme.forEach(modifierScheme => {
                if(modifierScheme.isRequired) required.push(modifierScheme);
            });
            setRequiredModifiers(required);
        } else if(details !== undefined && details.modifierScheme === undefined){
            setRequiredModifiers([]);
        }
    }, [details]);

    useEffect(() => {
        console.log(details);
        console.log(requiredModifiers);
    }, [requiredModifiers]);

    /* Checking if all needed ingredients are chosen */
    useEffect(() => {
        let neededModifiers = chosenModifiers.filter(modifier => modifier.inputName !== modifier.name);
        if(details !== undefined && neededModifiers.length === requiredModifiers.length){
            setIsAllModifiers(true);
        } else {
            setIsAllModifiers(false);
        }
    }, [chosenModifiers, requiredModifiers, details]);

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
            if(fullPrice !== 0 && (isAllModifiers || details?.modifierScheme === undefined || details?.modifierScheme.length === 0)) window.Telegram.WebApp.MainButton.text = `Добавить в корзину ${fullPrice}₽`;
            else if(fullPrice !== 0) window.Telegram.WebApp.MainButton.text = `Выберите опции ${fullPrice}₽`;
        }
    }, [isDetails, fullPrice, isAllModifiers]);

	const mainBtn = () => {
		if(isDetails === false){
			setIsCart(true);
			navigate('/cart');
		} else {
            if(isAllModifiers && details !== undefined){
                dispatch(addProduct({
                    myId: Date.now(),
                    id: details.id.toString(),
                    image: (details.images !== undefined && details.images[0] !== undefined) ? details.images[0] : '../images/food.svg',
                    ingredients: chosenModifiers,
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
	}, [mainBtn, isCart, chosenModifiers, requiredModifiers, numberOf, isAllModifiers, details, isValidation]);

    /* Haptic feedback */
    useEffect(() => {
        if(isDetails) window.Telegram.WebApp.HapticFeedback.selectionChanged();
    }, [numberOf, chosenModifiers]);

    return (
        <>
            {details !== undefined && detailsId &&
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
                    <img src={(details.images !== undefined && details.images[0] !== undefined) ? details.images[0] : '../images/food.svg'} alt={details.name} />
                    {(details.weight && details.measure) && <div className='product-id__weight'>{details.weight} {details.measure}</div>}
                </div>
                <h2 className='product-id__title'>{details.name}</h2>
                <button onClick={() => mainBtn()}>Main</button>
                <p className='product-id__descr'>{details.description}</p>
                {(details.carbohydrates || details.energy || details.fat || details.proteins) &&
                    <div className='product-id__value'>
                        Энергитическая ценность в 100 гр. 
                        <div className='product-id__wrapper'>
                            {details.energy && <div className="product-id__info">ккал<span>{details.energy}</span></div>}
                            {details.proteins && <div className="product-id__info">белки<span>{details.proteins} г</span></div>}
                            {details.fat && <div className="product-id__info">жиры<span>{details.fat} г</span></div>}
                            {details.carbohydrates && <div className="product-id__info">углеводы<span>{details.carbohydrates} г</span></div>}
                        </div>
                    </div>
                }
                <ModifiersForm formRef={formRef} details={details} isDetails={isDetails} isValidation={isValidation} setChosenModifiers={setChosenModifiers}/>
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