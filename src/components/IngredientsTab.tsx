import React, {useState} from 'react';
import { IIngredient } from '../API/vendorAPI';
import { ChosenIngredientI } from './ProductDetails';
import MyCheckbox from './UI/MyCheckbox';
import MyRadio from './UI/MyRadio';

interface ingredientTabProps{
    groupName: string;
    ingredients: IIngredient[];
    isChecbox: boolean;
    setChosenIngredients: React.Dispatch<React.SetStateAction<ChosenIngredientI[]>>
    isValidation?: boolean;
}

const IngredientsTab:React.FC<ingredientTabProps> = ({groupName, ingredients, isChecbox, setChosenIngredients, isValidation}) => {
    const [isActive, setIsActive] = useState(false);

    const onRadioClickHandler = ({id, inputName, name, price}: ChosenIngredientI) => {
        setChosenIngredients(prev => {
            let ingredients = prev.filter(ingr => ingr.inputName !== inputName);
            return [...ingredients, {id, inputName, name, price}];
        });
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
        <div className={isValidation ? (isActive ? 'product-id__group active-tab validated' : 'product-id__group validated') : (isActive ? 'product-id__group active-tab' : 'product-id__group')}>
            <div 
                className='product-id__group-title'
                onClick={() => setIsActive(prev => !prev)}
            >{groupName}</div>
            <div className='product-id__ingredinets'>
                {ingredients.map(ingredient => (
                    <div key={ingredient.id} className='product-id__ingredient'>
                        {isChecbox 
                        ? <MyCheckbox onClickHandler={onCheckboxClickHandler} id={ingredient.id.toString()} inputName={ingredient.name} label={ingredient.name} price={ingredient.price} /> 
                        : <MyRadio onClickHandler={onRadioClickHandler} id={ingredient.id.toString()} inputName={groupName} label={ingredient.name} price={ingredient.price}/>}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default IngredientsTab;