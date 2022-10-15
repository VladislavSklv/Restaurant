import React from 'react';

interface MyCheckboxProps{
    inputName: string;
    id: string;
    label: string;
    price: number;
}

const MyCheckbox: React.FC<MyCheckboxProps> = ({inputName, id, label, price}) => {
    return (
        <>
            <input 
                type='checkbox'
                className='custom-checkbox'
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

export default MyCheckbox;