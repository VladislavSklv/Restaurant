import React, { useEffect, useState } from 'react';
import { IIngredient } from '../API/vendorAPI';
import { IfinalProduct } from '../redux/productSlice';
import { IChosenIngredients } from './ModalComposition';
import MyInputRadioOrCheckbox from './UI/MyInputRadioOrCheckbox';

interface optionTabProps {
    optionId: string;
    ingredients: IIngredient[];
    inputName: string;
    isRadio: boolean;
    index: number;
    hasMainIngredients: boolean;
    handleOnClick?: (index: number) => void;
    setChosenIngredients: React.Dispatch<React.SetStateAction<IChosenIngredients[] | undefined>>
}

const OptionTab:React.FC<optionTabProps> = ({ingredients, inputName, optionId, isRadio, setChosenIngredients, index, hasMainIngredients, handleOnClick}) => {
    const [optionValue, setOptionValue] = useState('');
    const [optionValues, setOptionValues] = useState<string[]>([]);

    useEffect(() => {
        if(optionValue !== undefined && optionValue.length > 0 && hasMainIngredients){
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
        console.log(optionValues)
        if(optionValues !== undefined && optionValues.length > 0 && hasMainIngredients){
            setChosenIngredients(prev => {
                if(prev !== undefined && prev.length > 0) {
                    const array = prev.filter(ingredient => ingredient.myId !== JSON.parse(optionValues[0]).myId);
                    optionValues.forEach(option => {
                        array.push(JSON.parse(option));
                    });
                    return array;
                } else {
                    const array: IIngredient[] = [];
                    optionValues.forEach(option => {
                        array.push(JSON.parse(option));
                    });
                    return array;
                }
            });
        };
        if(!hasMainIngredients) {
            const array: IIngredient[] = [];
            optionValues.forEach(item => array.push(JSON.parse(item)));
            setChosenIngredients(array);
        }
    }, [optionValues]);

    return (
        <div 
            className='options__tab' 
            id={optionId}
        >
            {ingredients.map(ingredient => (
                <div className='options__item' key={ingredient.id}>
                    {isRadio 
                        ? <MyInputRadioOrCheckbox handleOnClick={handleOnClick} setOptionValue={setOptionValue} value={{id: ingredient.id, name: ingredient.name, price: ingredient.price, myId: index}} inputName={inputName} label={ingredient.name} inputClassName='custom-radio' inputType='radio' />
                        : <MyInputRadioOrCheckbox optionValues={optionValues} setOptionValues={setOptionValues} value={{id: ingredient.id, name: ingredient.name, price: ingredient.price, myId: index}} inputName={ingredient.name} label={ingredient.name} inputClassName='custom-checkbox' inputType='checkbox' />
                    }
                    <span>{ingredient.price} ₽</span>
                </div>
            ))}
        </div>
    );
};

export default OptionTab;