import React, { useState } from 'react';
import { IProductsTab } from '../API/vendorAPI';

export interface modalNavBarProps {
    productsTabs: IProductsTab[];
    setIsOpacity: React.Dispatch<React.SetStateAction<boolean>>;
    setIsModal: React.Dispatch<React.SetStateAction<boolean>>;
    isModal: boolean;
    activeTab?: string;
    setActiveTab?: React.Dispatch<React.SetStateAction<string>>;
}

export interface productsTabs {
	name: string;
	id: string;
}

const ModalNavBar: React.FC<modalNavBarProps> = ({productsTabs, setIsModal, setIsOpacity, isModal, activeTab, setActiveTab}) => {
    const [touchStart, setTouchStart] = useState(0);
    const [touchMove, setTouchMove] = useState(0);
    const [fullOpen, setFullOpen] = useState(false);

    return (
        <div style={isModal ? {'bottom': '0'} : {'bottom': '-100%'} } className={fullOpen ? 'modal-navbar modal-navbar_full' : 'modal-navbar'}>
            <div 
            onTouchStart={(e) => {
                setTouchStart(e.touches[0].screenY);
            }}
            onTouchMove={(e) => {
                setTouchMove(e.touches[0].screenY);
            }}
            onTouchEnd={() => {
                if(!fullOpen){
                    if(touchMove < touchStart) {
                        setFullOpen(true);
                    } else if(touchMove > touchStart) {
                        setIsModal(false);
                        setIsOpacity(false);
                    }
                } else {
                    setFullOpen(false);
                }
                setTouchMove(0);
                setTouchStart(0);
            }} 
            className='modal-navbar__title'>
            Меню</div>
            <div className='modal-navbar__scroll'>
                <div className='modal-navbar__hrefs'>
                    {productsTabs.map((productTab, i) => (
                        <a 
                            className={activeTab == productTab.id ? 'modal-navbar__href active' : 'modal-navbar__href'}
                            onClick={() => {
                                setIsModal(false);
                                setIsOpacity(false);
                                if(setActiveTab) setActiveTab(productTab.id);
                            }} 
                            href={`#${productTab.id}`} 
                            key={productTab.id}
                        >{productTab.name} <span>{productTab.products.length}</span></a>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default ModalNavBar;