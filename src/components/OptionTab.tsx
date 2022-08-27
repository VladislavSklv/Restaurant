import React, { HtmlHTMLAttributes } from 'react';
import { IIngredient } from '../API/vendorAPI';
import { useAppDispatch, useAppSelector } from '../hooks/hooks';
import MyInputRadioOrCheckbox from './UI/MyInputRadioOrCheckbox';

interface optionTabProps {
    optionId: string;
    ingredients: IIngredient[];
    inputName: string;
    isRadio: boolean;
    activeTab: string;
}

const OptionTab:React.FC<optionTabProps> = ({ingredients, inputName, optionId, isRadio, activeTab}) => {
    const dispatch = useAppDispatch();
    const {products} = useAppSelector(state => state.product);

    return (
        <div 
            className={activeTab === optionId ? 'options__tab options__tab_active' : 'options__tab'} 
            id={optionId}
            onClick={(e: any) => {
                console.log(e.target)
            }}
        >
            {ingredients.map(ingredient => (
                <div className='options__item' key={ingredient.id}>
                    {isRadio 
                        ? <MyInputRadioOrCheckbox id={ingredient.id} inputName={inputName} label={ingredient.name} inputClassName='custom-radio' inputType='radio' />
                        : <MyInputRadioOrCheckbox id={ingredient.id} inputName={ingredient.name} label={ingredient.name} inputClassName='custom-checkbox' inputType='checkbox' />
                    }
                    <span>{ingredient.price} ₽</span>
                </div>
            ))}
        </div>
    );
};

export default OptionTab;