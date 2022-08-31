import React from 'react';
import { IChosenIngredients } from '../ModalComposition';

interface myInputRadioProps {
    inputName: string;
    label: string;
    inputClassName: string;
    inputType: string;
    value: IChosenIngredients;
    setOptionValue?: React.Dispatch<React.SetStateAction<string>>;
    setOptionValues?: React.Dispatch<React.SetStateAction<string[]>>
    optionValues?: string[];
    handleOnClick?: (index: number) => void;
}

const MyInputRadioOrCheckbox:React.FC<myInputRadioProps> = ({inputName, label, inputClassName, inputType, value, setOptionValue, setOptionValues, optionValues, handleOnClick}) => {
    return (
        <>
            <input 
                type={inputType}
                className={inputClassName}
                name={inputName}
                id={value.id}
                value={JSON.stringify(value)}
                onClick={() => {
                    setOptionValue && setOptionValue(JSON.stringify(value));
                    if(setOptionValues && optionValues){
                        setOptionValues(prev => {
                            if(prev.includes(JSON.stringify(value))) {
                                const array = prev.filter(prevValue => prevValue !== JSON.stringify(value));
                                return array;
                            } else { 
                                return [...prev, JSON.stringify(value)];
                            }
                        });
                    };
                    if(inputType === 'radio' && handleOnClick && value.myId !== undefined){
                        handleOnClick(value.myId + 1)
                    }
                }}
            />
            <label htmlFor={value.id}>{label}</label>   
        </>
    );
};

export default MyInputRadioOrCheckbox;