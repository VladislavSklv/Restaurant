import React from 'react';
import { ChosenIngredientI } from '../ProductDetails';

interface MyRadioProps{
    inputName: string;
    forId: string;
    id: string;
    label: string;
    price: number;
    onClickHandler?: ({ id, name }: ChosenIngredientI) => void
}

const MyRadio: React.FC<MyRadioProps> = ({inputName, id, label, price, onClickHandler, forId}) => {
    return (
        <>
            <input 
                type='radio'
                className='custom-radio'
                name={inputName}
                id={forId}
                value={id}
                onClick={() => onClickHandler && onClickHandler({id: parseInt(id), inputName, price, name: label})}
            />
            <label htmlFor={forId}>{label} <span>{price} ₽</span></label>   
        </>
    );
};

export default MyRadio;