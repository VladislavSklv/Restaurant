import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Slider from 'react-slick';
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
}

export interface IChosenIngredients {
    id: string;
    name: string;
    price: number;
    myId?: number;
}

const ModalComposition:React.FC<modalCompositionProps> = ({ingredientsMainGroup, ingredientsOptional, isModalComp, setIsModalComp, id, myId}) => {
    const [chosenIngredients, setChosenIngredients] = useState<IChosenIngredients[]>();
    const [finalChosenIngredients, setFinalChosenIngredients] = useState<any>();
    let productsTabsNames: productsTabs[] = [];
	ingredientsMainGroup.map(productTab => {
		productsTabsNames.push({name: productTab.name, id: productTab.id});
	});
    productsTabsNames.push({name: 'Дополнительно', id: 'optional'});

    const navigate = useNavigate();
    const dispatch = useAppDispatch();

    useEffect(() => {
        const fci = chosenIngredients?.map(chosenIngredient => {
            delete chosenIngredient.myId;
            return chosenIngredient;
        });
        setFinalChosenIngredients(fci);
        if(isModalComp){
            Telegram.WebApp.MainButton.setParams({'is_visible': true, 'text': 'Готово'});
            Telegram.WebApp.MainButton.onClick((e: any) => {
                e.preventDefault();
                if(finalChosenIngredients && finalChosenIngredients !== undefined) dispatch(addIngredientsToProductByMyId({ingredients: finalChosenIngredients, id, myId}));
                navigate('/cart');
            });
        }
    }, [isModalComp, chosenIngredients]);

    /* !!! InitialSlide */
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

    return (
        <div className={isModalComp ? 'modal-comp modal-comp_active' : 'modal-comp'}>
            <form className='options'>
                <Slider {...sliderSettings}>
                    {ingredientsMainGroup.map((ingredientGroup, i) => (
                        <OptionTab index={i} setChosenIngredients={setChosenIngredients} isRadio={true} ingredients={ingredientGroup.ingredients} inputName={ingredientGroup.name} optionId={ingredientGroup.id} key={ingredientGroup.id + i + Date.now()} />
                    ))}
                    <OptionTab index={99999999} setChosenIngredients={setChosenIngredients} isRadio={false} ingredients={ingredientsOptional} inputName='optional' optionId='optional' />
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