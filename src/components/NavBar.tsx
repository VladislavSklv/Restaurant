import React from 'react';
import { productsTabs } from './ModalNavBar';

export interface navBarProps {
    productsTabsNames: productsTabs[];
    isHamburger: boolean;
    setIsOpacity?: React.Dispatch<React.SetStateAction<boolean>>;
    setIsModal?: React.Dispatch<React.SetStateAction<boolean>>;
    activeTab?: string;
    setActiveTab?: React.Dispatch<React.SetStateAction<string>>;
}

const NavBar:React.FC<navBarProps> = ({productsTabsNames, setIsModal, setIsOpacity, isHamburger, activeTab, setActiveTab}) => {
    return (
        <div className='navbar'>
            {isHamburger && setIsOpacity && setIsModal &&
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
            }
            <div className='navbar__wrapper'>
                {productsTabsNames.map(productTab => (
                    <a 
                        href={`#${productTab.id}`} 
                        className={activeTab == productTab.id ? 'navbar__href active' : 'navbar__href'} 
                        key={productTab.id}
                        onClick={() => {
                            if(setActiveTab) setActiveTab(productTab.id);
                        }}
                    >{productTab.name}</a>
                ))}
            </div>
        </div>
    );
};

export default NavBar;