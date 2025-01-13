import React from 'react';
import { ChosenIngredientI } from '../ProductDetails';

interface MyCheckboxProps{
    inputName: string;
    forId: string;
    id: string;
    label: string;
    price: number;
    onClickHandler?: ({ id, name }: ChosenIngredientI) => void
}

const MyCheckbox: React.FC<MyCheckboxProps> = ({inputName, id, label, price, onClickHandler, forId}) => {
    return (
        <>
            <input 
                type='checkbox'
                className='custom-checkbox'
                name={inputName}
                id={forId}
                value={id}
                onClick={() => onClickHandler && onClickHandler({id: parseInt(id),inputName, price, name: label})}
            />
            <label htmlFor={forId}>{label} <span>{price} so’m</span></label>   
        </>
    );
};

export default MyCheckbox;