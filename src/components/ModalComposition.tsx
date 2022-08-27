import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { IIngredient, IIngredientGroup } from '../API/vendorAPI';
import { productsTabs } from '../App';
import OptionTab from './OptionTab';

interface modalCompositionProps {
    ingredientsMainGroup: IIngredientGroup[];
    ingredientsOptional: IIngredient[];
    isModalComp: boolean;
    setIsModalComp: React.Dispatch<React.SetStateAction<boolean>>;
    activeTab: string;
    setActiveTab: React.Dispatch<React.SetStateAction<string>>
}

const ModalComposition:React.FC<modalCompositionProps> = ({ingredientsMainGroup, ingredientsOptional, isModalComp, setIsModalComp, activeTab, setActiveTab}) => {
    let productsTabsNames: productsTabs[] = [];
	ingredientsMainGroup.map(productTab => {
		productsTabsNames.push({name: productTab.name, id: productTab.id});
	});
    productsTabsNames.push({name: 'Дополнительно', id: 'optional'});

    const navigate = useNavigate();

    useEffect(() => {
        if(ingredientsMainGroup.length > 0) setActiveTab(ingredientsMainGroup[0].id);
        else if(ingredientsOptional.length > 0) setActiveTab('optional');
        if(isModalComp){
            Telegram.WebApp.MainButton.setParams({'is_visible': true, 'text': 'Готово'});
            Telegram.WebApp.MainButton.onClick(() => {
                navigate('/cart');
            });
        }
    }, [isModalComp]);

    return (
        <div className={isModalComp ? 'modal-comp modal-comp_active' : 'modal-comp'}>
            <div className='navbar'>
                <div className='navbar__wrapper'>
                    {productsTabsNames.map(productTab => (
                        <a 
                            href={`#${productTab.id}`} 
                            className={activeTab === productTab.id ? 'navbar__href active' : 'navbar__href'} 
                            key={productTab.id}
                            onClick={(e: any) => {
                                e.preventDefault();
                                setActiveTab(productTab.id);
                            }}
                        >{productTab.name}</a>
                    ))}
                </div>
            </div>
            <form className='options'>
                {ingredientsMainGroup.map((ingredientGroup, i) => (
                    <OptionTab activeTab={activeTab} isRadio={true} ingredients={ingredientGroup.ingredients} inputName={ingredientGroup.name} optionId={ingredientGroup.id} key={ingredientGroup.id + i + Date.now()} />
                ))}
                <OptionTab activeTab={activeTab} isRadio={false} ingredients={ingredientsOptional} inputName='optional' optionId='optional' />
            </form>
        </div>
    );
};

export default ModalComposition;