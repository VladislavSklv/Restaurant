import React from 'react';
import { IProductDetails } from '../API/vendorAPI';
import IngredientsTab from './IngredientsTab';
import { ChosenIngredientI } from './ProductDetails';

interface ingredientsFormProps{
    details: IProductDetails;
    isDetails: boolean;
    isValidation: boolean;
    setChosenIngredients: React.Dispatch<React.SetStateAction<ChosenIngredientI[]>>;
    formRef: React.MutableRefObject<HTMLFormElement | null>;
}

const IngredientsForm:React.FC<ingredientsFormProps> = ({details, isDetails, isValidation, setChosenIngredients, formRef}) => {
    return (
        <form ref={formRef} className='product-id__form'>
            {details.ingredientGroups.length > 0 && 
                <>
                    {details.ingredientGroups.map(group => 
                        <IngredientsTab isDetails={isDetails} isValidation={isValidation} key={group.id} setChosenIngredients={setChosenIngredients} groupName={group.name} ingredients={group.ingredients} isCheckbox={false} />
                    )}
                </>}
            {details.ingredients.length > 0 && 
                <IngredientsTab key={'optional'} isDetails={isDetails} setChosenIngredients={setChosenIngredients} groupName='Дополнительно' ingredients={details.ingredients} isCheckbox={true}/>
            }
        </form>
    );
};

export default IngredientsForm;