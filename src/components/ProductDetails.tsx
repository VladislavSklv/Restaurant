import React, {useState} from 'react';
import { useGetProductDetailsQuery } from '../API/vendorAPI';
import ErrorBlock from './ErrorBlock';
import IngredientsTab from './IngredientsTab';
import Loader from './Loader';
import MinMaxBtns from './UI/MinMaxBtns';

interface productDetailsProps {
    vendorId: number;
    isDetails: boolean;
    setIsDetails: React.Dispatch<React.SetStateAction<boolean>>;
    detailsId: number;
    setDetailsId: React.Dispatch<React.SetStateAction<number>>;
    setIsOpacity: React.Dispatch<React.SetStateAction<boolean>>;
}

export interface ChosenIngredientI{
    id: number;
    name: string;
    inputName: string;
    price: number;
}

const ProductDetails:React.FC<productDetailsProps> = ({vendorId,isDetails ,detailsId, setDetailsId, setIsDetails, setIsOpacity}) => {
    const {isLoading, isError, data: details} = useGetProductDetailsQuery({productId: detailsId.toString(), vendorId});
    const [numberOf, setNumberOf] = useState(1);
    const [chosenIngredients, setChosenIngredients] = useState<ChosenIngredientI[]>([]);
    const [touchStart, setTouchStart] = useState(0);
    const [touchMove, setTouchMove] = useState(0);
    const [fullOpen, setFullOpen] = useState(false);


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
            <div style={isDetails ? {'bottom': '0'} : {'bottom': '-100%'}} className={fullOpen ? 'product-id product-id__full' : 'product-id'}>
                <div className='product-id__img'>
                    <img src={details.image || '../images/food.svg'} alt={details.name} />
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
                <form className='product-id__form'>
                    {details.ingredientGroups.length > 0 && 
                        <>
                            {details.ingredientGroups.map(group => 
                                <IngredientsTab key={group.id} setChosenIngredients={setChosenIngredients} groupName={group.name} ingredients={group.ingredients} isChecbox={false} />
                            )}
                        </>}
                    {details.ingredients.length > 0 && 
                        <IngredientsTab key={'optional'} setChosenIngredients={setChosenIngredients} groupName='Дополнительно' ingredients={details.ingredients} isChecbox={true}/>
                    }
                </form>
                <div className='product-id__number'>
                    <h2 className='title'>Количество:</h2>
                    <MinMaxBtns numberOf={numberOf} onClickMin={onClickMinHandler} onClickMax={onClickMaxHandler} />
                </div>
                <div 
                    className='product-id__line'
                    onTouchStart={(e) => {
                        setTouchStart(e.touches[0].screenY);
                    }}
                    onTouchMove={(e) => {
                        setTouchMove(e.touches[0].screenY);
                    }}
                    onTouchEnd={() => {
                        if(!fullOpen){
                            if(touchMove < touchStart) {
                                setFullOpen(true);
                            } else if(touchMove > touchStart) {
                                setIsDetails(false);
                                setIsOpacity(false);
                            }
                        } else {
                            setFullOpen(false);
                        }
                        setTouchMove(0);
                        setTouchStart(0);
                    }} 
                ><span></span></div>
                <div 
                    className='cross'
                    onClick={() => {
                        setIsDetails(false);
                        setIsOpacity(false);
                    }}
                ><span></span><span></span></div>
            </div>}
        </>
    );
};

export default ProductDetails;