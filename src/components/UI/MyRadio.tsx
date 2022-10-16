import React from 'react';
import { ChosenIngredientI } from '../ProductDetails';

interface MyRadioProps{
    inputName: string;
    id: string;
    label: string;
    price: number;
    onClickHandler?: ({ id, name }: ChosenIngredientI) => void
}

const MyRadio: React.FC<MyRadioProps> = ({inputName, id, label, price, onClickHandler}) => {
    return (
        <>
            <input 
                type='radio'
                className='custom-radio'
                name={inputName}
                id={id}
                value={id}
                onClick={() => onClickHandler && onClickHandler({id: parseInt(id),inputName, price, name: label})}
            />
            <label htmlFor={id}>{label} <span>{price} ₽</span></label>   
        </>
    );
};

export default MyRadio;