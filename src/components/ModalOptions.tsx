import React, { useEffect, useState } from 'react';
import Slider from 'react-slick';
import { IIngredient, IIngredientGroup } from '../API/vendorAPI';
import OptionTab from './OptionTab';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { useAppDispatch } from '../hooks/hooks';
import { addIngredientsToProductByMyId } from '../redux/productSlice';
import { productsTabs } from './ModalNavBar';

interface modalOptionsProps {
    ingredientsMainGroup: IIngredientGroup[];
    ingredientsOptional: IIngredient[];
    isModalComp: boolean;
    setIsModalComp: React.Dispatch<React.SetStateAction<boolean>>;
    id: string;
    myId: number;
    sliderRef: React.MutableRefObject<any>;
    finalChosenIngredients: any;
    setFinalChosenIngredients: React.Dispatch<any>;
}

export interface IChosenIngredients {
    id: number;
    name: string;
    price: number;
    myId?: number;
}

const ModalOptions:React.FC<modalOptionsProps> = ({ingredientsMainGroup, ingredientsOptional, isModalComp, setIsModalComp, id, myId, sliderRef, finalChosenIngredients, setFinalChosenIngredients}) => {
    const [chosenIngredients, setChosenIngredients] = useState<IChosenIngredients[]>();
    const [hasMainIngredients, setHasMainIngredients] = useState(ingredientsMainGroup.length > 0);

    let productsTabsNames: productsTabs[] = [];
	ingredientsMainGroup.map(productTab => {
		productsTabsNames.push({name: productTab.name, id: productTab.id});
	});
    productsTabsNames.push({name: 'Дополнительно', id: 'optional'});

    const dispatch = useAppDispatch();

    Telegram.WebApp.MainButton.onClick(() => {
        setIsModalComp(false);
        dispatch(addIngredientsToProductByMyId({ingredients: finalChosenIngredients, id, myId}));
    });

    useEffect(() => {
        const fci = chosenIngredients?.map(chosenIngredient => {
            const {myId, ...rest} = chosenIngredient;
            return rest;
        });
        fci?.sort(function (a, b) {
            if (a.id > b.id) {
              return 1;
            }
            if (a.id < b.id) {
              return -1;
            }
            return 0;
        })
        setFinalChosenIngredients(fci);
    }, [chosenIngredients]);

    const setBtnTrue = () => {
        window.Telegram.WebApp.MainButton.setParams({'color': '#4986CC', 'is_visible': true, 'text_color': '#ffffff', 'text': 'Готово', 'is_active': true}).enable();
    };

    const setBtnFalse = () => {
        window.Telegram.WebApp.MainButton.setParams({'color': '#4986CC', 'is_visible': true, 'text_color': '#ffffff', 'text': 'Выберите состав', 'is_active': false}).disable();
    };

    if(hasMainIngredients === true && isModalComp === true && (finalChosenIngredients === undefined || finalChosenIngredients.length === 0) && (chosenIngredients === undefined || chosenIngredients.length === 0)) setBtnFalse();
    if(hasMainIngredients === false && isModalComp === true && (finalChosenIngredients === undefined || finalChosenIngredients.length === 0) && (chosenIngredients === undefined || chosenIngredients.length === 0)) setBtnTrue();

    useEffect(() => {
        if(isModalComp === true){
            if(ingredientsMainGroup.length > 0 && finalChosenIngredients !== undefined && chosenIngredients !== undefined){
                const arrayWithoutOptional = chosenIngredients.filter((ingredient: any) => ingredient.myId !== 99999999);
                if(ingredientsMainGroup.length <= arrayWithoutOptional.length) {
                    setBtnTrue();
                } else setBtnFalse();
            } else if(finalChosenIngredients !== undefined && chosenIngredients !== undefined) {
                setBtnTrue();
            };
        };
    }, [finalChosenIngredients, chosenIngredients]);

    const sliderSettings = {
        dots: true,
        infinite: false,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        adaptiveHeight: true,
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
            </form>
        </div>
    );
};

export default ModalOptions;