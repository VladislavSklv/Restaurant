import React, { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Slider, { InnerSlider } from 'react-slick';
import { IIngredient, IIngredientGroup } from '../API/vendorAPI';
import { productsTabs } from '../App';
import OptionTab from './OptionTab';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { useAppDispatch } from '../hooks/hooks';
import { addIngredientsToProductByMyId } from '../redux/productSlice';

interface modalCompositionProps {
    ingredientsMainGroup: IIngredientGroup[];
    ingredientsOptional: IIngredient[];
    isModalComp: boolean;
    setIsModalComp: React.Dispatch<React.SetStateAction<boolean>>;
    id: string;
    myId: number;
    initialSlide: number;
    setInitialSlide: React.Dispatch<React.SetStateAction<number>>;
}

export interface IChosenIngredients {
    id: string;
    name: string;
    price: number;
    myId?: number;
}

const ModalComposition:React.FC<modalCompositionProps> = ({ingredientsMainGroup, ingredientsOptional, isModalComp, setIsModalComp, id, myId, initialSlide, setInitialSlide}) => {
    const [chosenIngredients, setChosenIngredients] = useState<IChosenIngredients[]>();
    const [finalChosenIngredients, setFinalChosenIngredients] = useState<any>();
    const [hasMainIngredients, setHasMainIngredients] = useState(ingredientsMainGroup.length > 0);
    const sliderRef = useRef<any>(null);

    let productsTabsNames: productsTabs[] = [];
	ingredientsMainGroup.map(productTab => {
		productsTabsNames.push({name: productTab.name, id: productTab.id});
	});
    productsTabsNames.push({name: 'Дополнительно', id: 'optional'});

    const navigate = useNavigate();
    const dispatch = useAppDispatch();

    useEffect(() => {
        console.log(chosenIngredients);
        const fci = chosenIngredients?.map(chosenIngredient => {
            const {myId, ...rest} = chosenIngredient;
            return rest;
        });
        setFinalChosenIngredients(fci);
    }, [chosenIngredients]);

    const setBtnTrue = () => {
        Telegram.WebApp.MainButton.setParams({'color': '#4986CC', 'is_visible': true, 'text_color': '#ffffff', 'text': 'Готово', 'is_active': true});
        Telegram.WebApp.MainButton.onClick(() => {
            if(finalChosenIngredients !== undefined) dispatch(addIngredientsToProductByMyId({ingredients: finalChosenIngredients, id, myId}));
            navigate('/cart');
        });
    };

    const setBtnFalse = () => {
        Telegram.WebApp.MainButton.setParams({'color': '#4986CC', 'is_visible': true, 'text_color': '#ffffff', 'text': 'Выберите состав', 'is_active': false});
        Telegram.WebApp.MainButton.onClick(() => {
            return false;
        });
    };

    if(hasMainIngredients) setBtnFalse();
    else setBtnTrue();

    useEffect(() => {
        if(isModalComp){
            if(ingredientsMainGroup.length > 0 && finalChosenIngredients !== undefined && chosenIngredients !== undefined){
                const arrayWithoutOptional = chosenIngredients.filter((ingredient: any) => ingredient.myId !== 99999999);
                console.log(ingredientsMainGroup, arrayWithoutOptional);
                if(ingredientsMainGroup.length <= arrayWithoutOptional.length) setBtnTrue(); 
                else setBtnFalse();
            } else if(finalChosenIngredients !== undefined && chosenIngredients !== undefined) setBtnTrue();
        } else setBtnFalse();
    }, [finalChosenIngredients]);

    /* !!! InitialSlide */
    const sliderSettings = {
        dots: true,
        infinite: false,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        adaptiveHeight: true,
        initialSlide,
        customPaging: function(i: number) {
            return (
                <a
                    className='slick-dot__href' 
                    key={productsTabsNames[i].id}
                >{productsTabsNames[i].name}</a>
            )
        },
        dotsClass: "slick-dots slick-thumb"
    };

    const handleOnClick = (index: number) => {
        if(sliderRef.current !== null) sliderRef.current.slickGoTo(index);
    };

    return (
        <div className={isModalComp ? 'modal-comp modal-comp_active' : 'modal-comp'}>
            {ingredientsMainGroup.length === 0 && 
            <div className='navbar'>
                <div className='navbar__wrapper'>
                        <div 
                            className='navbar__href active'
                        >Дополнительно</div>
                </div>
            </div>}
            <form className='options'>
                <Slider {...sliderSettings} ref={sliderRef}>
                    {ingredientsMainGroup.map((ingredientGroup, i) => (
                        <OptionTab handleOnClick={handleOnClick} hasMainIngredients={hasMainIngredients} index={i} setChosenIngredients={setChosenIngredients} isRadio={true} ingredients={ingredientGroup.ingredients} inputName={ingredientGroup.name} optionId={ingredientGroup.id} key={ingredientGroup.id + i + Date.now()} />
                    ))}
                    <OptionTab hasMainIngredients={hasMainIngredients} index={99999999} setChosenIngredients={setChosenIngredients} isRadio={false} ingredients={ingredientsOptional} inputName='optional' optionId='optional' />
                </Slider>
                <button
                    onClick={(e) => {
                        e.preventDefault();
                        console.log(finalChosenIngredients);
                        if(finalChosenIngredients !== undefined) dispatch(addIngredientsToProductByMyId({ingredients: finalChosenIngredients, id, myId}));
                        navigate('/cart');
                    }}  
                >Submit</button>
            </form>
        </div>
    );
};

export default ModalComposition;