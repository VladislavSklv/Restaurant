import React from 'react';
import { productsTabs } from '../App';

export interface navBarProps {
    productsTabsNames: productsTabs[];
    setIsOpacity: React.Dispatch<React.SetStateAction<boolean>>;
    setIsModal: React.Dispatch<React.SetStateAction<boolean>>;
}

const NavBar:React.FC<navBarProps> = ({productsTabsNames, setIsModal, setIsOpacity}) => {
    return (
        <div className='navbar'>
            <div 
                className='hamburger'
                onClick={() => {    
                    setIsModal(true);
                    setIsOpacity(true);
                }}
            >
                <span className='hamburger__block'></span>
                <span className='hamburger__block'></span>
                <span className='hamburger__block'></span>
            </div>
            <div className='navbar__wrapper'>
                {productsTabsNames.map((productTab, i) => (
                    <a href={`#${productTab.id}`} className='navbar__href' key={productTab.id}>{productTab.name}</a>
                ))}
            </div>
        </div>
    );
};

export default NavBar;