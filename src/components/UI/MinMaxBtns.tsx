import React from 'react';

interface minMaxBtnsProps {
    onClickMin: () => void;
    onClickMax: () => void;
    numberOf: number;
    noText?: boolean;
}

const MinMaxBtns: React.FC<minMaxBtnsProps> = ({numberOf, onClickMax, onClickMin, noText}) => {
    return (
        <div className='product__numberof'>
            <button 
                className="product__btn_min"
                onClick={onClickMin} 
            ><span></span></button>
            <div onClick={(e) => e.stopPropagation()}>{numberOf} {noText ? '' : 'шт.'}</div>
            <button 
                className="product__btn_min"
                onClick={onClickMax} 
            ><span></span><span></span></button>
        </div>
    );
};

export default MinMaxBtns;