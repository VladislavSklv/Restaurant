import React from 'react';
import MyRadio from './UI/MyRadio';

interface payMethodProps {
    price: number;
    id: string;
    label: string;
    inputName: string;
    onClick: () => void;
    text?: string;
    imgSrc: string;
}

const PayMethod:React.FC<payMethodProps> = ({id, inputName, label, price, text, imgSrc, onClick}) => {
    return (
        <div className='pay-method'>
            <div className='pay-method__img'><img src={imgSrc} alt={'img' + id} /></div>
            <MyRadio forId={id + Date.now()} onClickHandler={onClick} price={price} id={id} label={label} inputName={inputName} />
            <p className='pay-method__text'>{text}</p>
        </div>
    );
};

export default PayMethod;