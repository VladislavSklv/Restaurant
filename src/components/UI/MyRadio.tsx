import React from 'react';

interface MyRadioProps{
    inputName: string;
    id: string;
    label: string;
    price: number;
}

const MyRadio: React.FC<MyRadioProps> = ({inputName, id, label, price}) => {
    return (
        <>
            <input 
                type='radio'
                className='custom-radio'
                name={inputName}
                id={id}
                value={id}
                onClick={() => {
                }}
            />
            <label htmlFor={id}>{label} <span>{price} ₽</span></label>   
        </>
    );
};

export default MyRadio;