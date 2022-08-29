import React, { HtmlHTMLAttributes, useEffect, useState } from 'react';
import { IIngredient } from '../API/vendorAPI';
import { useAppDispatch, useAppSelector } from '../hooks/hooks';
import { IChosenIngredients } from './ModalComposition';
import MyInputRadioOrCheckbox from './UI/MyInputRadioOrCheckbox';

interface optionTabProps {
    optionId: string;
    ingredients: IIngredient[];
    inputName: string;
    isRadio: boolean;
    index: number;
    setChosenIngredients: React.Dispatch<React.SetStateAction<IChosenIngredients[] | undefined>>
}

const OptionTab:React.FC<optionTabProps> = ({ingredients, inputName, optionId, isRadio, setChosenIngredients, index}) => {
    const [optionValue, setOptionValue] = useState('');
    const [optionValues, setOptionValues] = useState<string[]>([]);

    const dispatch = useAppDispatch();
    const {products} = useAppSelector(state => state.product);

    useEffect(() => {
        if(optionValue !== undefined && optionValue.length > 0){
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
        if(optionValues !== undefined && optionValues.length > 0){
            setChosenIngredients(prev => {
                if(prev !== undefined && prev.length > 0) {
                    const array = prev.filter(ingredient => ingredient.myId !== JSON.parse(optionValues[0]).myId);
                    optionValues.forEach(option => {
                        array.push(JSON.parse(option));
                    });
                    return array;
                }
            });
        };
    }, [optionValues]);

    return (
        <div 
            className='options__tab' 
            id={optionId}
        >
            {ingredients.map(ingredient => (
                <div className='options__item' key={ingredient.id}>
                    {isRadio 
                        ? <MyInputRadioOrCheckbox setOptionValue={setOptionValue} value={{id: ingredient.id, name: ingredient.name, price: ingredient.price, myId: index}} inputName={inputName} label={ingredient.name} inputClassName='custom-radio' inputType='radio' />
                        : <MyInputRadioOrCheckbox optionValues={optionValues} setOptionValues={setOptionValues} value={{id: ingredient.id, name: ingredient.name, price: ingredient.price, myId: index}} inputName={ingredient.name} label={ingredient.name} inputClassName='custom-checkbox' inputType='checkbox' />
                    }
                    <span>{ingredient.price} ₽</span>
                </div>
            ))}
        </div>
    );
};

export default OptionTab;