import React from 'react';
import { ChosenIngredientI } from '../ProductDetails';

interface MyCheckboxProps{
    inputName: string;
    id: string;
    label: string;
    price: number;
    onClickHandler?: ({ id, name }: ChosenIngredientI) => void
}

const MyCheckbox: React.FC<MyCheckboxProps> = ({inputName, id, label, price, onClickHandler}) => {
    return (
        <>
            <input 
                type='checkbox'
                className='custom-checkbox'
                name={inputName}
                id={id}
                value={id}
                onClick={() => onClickHandler && onClickHandler({id: parseInt(id),inputName, price, name: label})}
            />
            <label htmlFor={id}>{label} <span>{price} ₽</span></label>   
        </>
    );
};

export default MyCheckbox;