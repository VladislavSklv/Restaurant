import React, {useEffect, useState} from 'react';
import { ChosenIngredientI } from './ProductDetails';
import MyCheckbox from './UI/MyCheckbox';
import MyRadio from './UI/MyRadio';
import {Collapse} from 'react-collapse';
import { IModifier } from '../API/vendorAPI';

interface ingredientTabProps{
    groupName: string;
    modifiers: IModifier[];
    isCheckbox: boolean;
    isDetails: boolean;
    setChosenIngredients: React.Dispatch<React.SetStateAction<ChosenIngredientI[]>>
    isValidation?: boolean;
}

const ModifiersTab:React.FC<ingredientTabProps> = ({groupName, modifiers, isCheckbox, setChosenIngredients, isValidation, isDetails}) => {
    const [isActive, setIsActive] = useState(false);
    const [isChosen, setIsChosen] = useState(false);

    /* Set component to default state */
    useEffect(() => {
        setIsActive(false);
        setIsChosen(false);
    }, [isDetails]);

    /* Handlers */
    const onRadioClickHandler = ({id, inputName, name, price}: ChosenIngredientI) => {
        setChosenIngredients(prev => {
            let ingredients = prev.filter(ingr => ingr.inputName !== inputName);
            return [...ingredients, {id, inputName, name, price}];
        });
        setIsChosen(true);
    };

    const onCheckboxClickHandler = ({id, inputName, name, price}: ChosenIngredientI) => {
        setChosenIngredients(prev => {
            let checker = false;
            prev.forEach(item => {
                if(item.id === id) checker = true;
            });
            if(checker) return prev.filter(item => item.id !== id);
            else return [...prev, {id, inputName, name, price}];
        });
    };

    return (
        <div className={(isValidation && !isChosen) ? (isActive ? 'product-id__group active-tab validated' : 'product-id__group validated') : (isActive ? 'product-id__group active-tab' : 'product-id__group')}>
            <div 
                className='product-id__group-title'
                onClick={() => setIsActive(prev => !prev)}
            >{groupName}</div>
            <Collapse isOpened={isActive}>
                <div className='product-id__ingredinets'>
                    {modifiers.map(modifier => (
                        <div key={modifier.id} className='product-id__ingredient'>
                            {isCheckbox 
                            ? <MyCheckbox onClickHandler={onCheckboxClickHandler} id={modifier.id.toString()} forId={modifier.id.toString() + Date.now()} inputName={modifier.name} label={modifier.name} price={modifier.price === undefined ? 0 : modifier.price} /> 
                            : <MyRadio onClickHandler={onRadioClickHandler} id={modifier.id.toString()} forId={modifier.id.toString() + Date.now()} inputName={groupName} label={modifier.name} price={modifier.price === undefined ? 0 : modifier.price}/>}
                        </div>
                    ))}
                </div> 
            </Collapse>
        </div>
    );
};

export default ModifiersTab;