import React from 'react';

interface minMaxBtnsProps {
    onClickMin: () => void;
    onClickMax: () => void;
    numberOf: number;
    isAnim?: boolean;
}

const MinMaxBtns: React.FC<minMaxBtnsProps> = ({numberOf, onClickMax, onClickMin, isAnim}) => {
    return (
        <div
            style={(isAnim && numberOf === 0) ? {opacity: 0, pointerEvents: 'none', transitionDelay: '0ms'} : {opacity: 1, pointerEvents: 'all', transitionDelay: '150ms'}}
            className='product__numberof'
        >
            <button 
                className="product__btn_min"
                onClick={onClickMin} 
            ><span></span></button>
            <div onClick={(e) => e.stopPropagation()}>{numberOf}</div>
            <button 
                className="product__btn_min"
                onClick={onClickMax} 
            ><span></span><span></span></button>
        </div>
    );
};

export default MinMaxBtns;