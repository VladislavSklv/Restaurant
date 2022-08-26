import React from 'react';
import { productsTabs } from '../App';

export interface modalNavBarProps {
    productsTabsNames: productsTabs[];
    setIsOpacity: React.Dispatch<React.SetStateAction<boolean>>;
    setIsModal: React.Dispatch<React.SetStateAction<boolean>>;
    isModal: boolean;
}

const ModalNavBar: React.FC<modalNavBarProps> = ({productsTabsNames, setIsModal, setIsOpacity, isModal}) => {
    return (
        <div style={isModal ? {'bottom': '0'} : {'bottom': '-100%'} } className='modal'>
            <div className='modal__title'>
                <div 
                    className='cross' 
                    onClick={() => {
                        setIsModal(false);
                        setIsOpacity(false);
                    }}
                ><span></span><span></span></div> 
            Меню</div>
            <div className='modal__hrefs'>
                {productsTabsNames.map((productTab, i) => (
                    <a 
                        className='modal__href' 
                        onClick={() => {
                            setIsModal(false);
                            setIsOpacity(false);
                        }} 
                        href={`#${productTab.id}`} 
                        key={productTab.id}
                    >{productTab.name}</a>
                ))}
            </div>
        </div>
    );
};

export default ModalNavBar;