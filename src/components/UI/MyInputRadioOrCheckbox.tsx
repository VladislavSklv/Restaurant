import React from 'react';

interface myInputRadioProps {
    id: string;
    inputName: string;
    label: string;
    inputClassName: string;
    inputType: string;
    onClickHandler?: () => void;
}

const MyInputRadioOrCheckbox:React.FC<myInputRadioProps> = ({id, inputName, label, inputClassName, inputType, onClickHandler}) => {
    return (
        <>
            <input 
                type={inputType}
                className={inputClassName}
                name={inputName}
                id={id}
                onClick={onClickHandler}
            />
            <label htmlFor={id}>{label}</label>   
        </>
    );
};

export default MyInputRadioOrCheckbox;