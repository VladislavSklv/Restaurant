import React, {useState} from 'react';

interface inputProps {
    placeholder: string;
    type: string;
    id: string;
    isValidated: boolean;
    errorText: string;
    inputValue: string;
    setInputValue: React.Dispatch<React.SetStateAction<string>>;
}

const MyInput:React.FC<inputProps> = ({placeholder, id, type, isValidated, errorText, inputValue, setInputValue}) => {
    return (
        <div className='input-wrapper'>
            <input value={inputValue} onChange={e => setInputValue(e.target.value)} id={id} className={(isValidated && inputValue.split(/\s+/).join('') === '') ? "input input_validated" : "input"} type={type} placeholder=" " />
            <label htmlFor={id} className="placeholder">{placeholder}</label>
            {(isValidated && inputValue.split(/\s+/).join('') === '') && <p className='input-error'>{errorText}</p>}
        </div>
    );
};

export default MyInput;