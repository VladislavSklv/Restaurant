import React, {useState} from 'react';
import { IIngredient } from '../API/vendorAPI';
import MyCheckbox from './UI/MyCheckbox';
import MyRadio from './UI/MyRadio';

interface ingredientTabProps{
    groupName: string;
    ingredients: IIngredient[];
    isChecbox: boolean;
}

const IngredientsTab:React.FC<ingredientTabProps> = ({groupName, ingredients, isChecbox}) => {
    const [isActive, setIsAvtive] = useState(false);

    return (
        <div className={isActive ? 'product-id__group active-tab' : 'product-id__group'}>
            <div 
                className='product-id__group-title'
                onClick={() => setIsAvtive(prev => !prev)}
            >{groupName}</div>
            <div className='product-id__ingredinets'>
                {ingredients.map(ingredient => (
                    <div key={ingredient.id} className='product-id__ingredient'>
                        {isChecbox 
                        ? <MyCheckbox id={ingredient.id.toString()} inputName={ingredient.name} label={ingredient.name} price={ingredient.price} /> 
                        : <MyRadio id={ingredient.id.toString()} inputName={groupName} label={ingredient.name} price={ingredient.price}/>}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default IngredientsTab;