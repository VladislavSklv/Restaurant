import React, { useState } from 'react';

export interface modalNavBarProps {
    productsTabsNames: productsTabs[];
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

const ModalNavBar: React.FC<modalNavBarProps> = ({productsTabsNames, setIsModal, setIsOpacity, isModal, activeTab, setActiveTab}) => {
    const [touchStart, setTouchStart] = useState(0);
    const [touchMove, setTouchMove] = useState(0);
    const [fullOpen, setFullOpen] = useState(false);

    return (
        <div style={isModal ? {'bottom': '0'} : {'bottom': '-100%'} } className={fullOpen ? 'modal modal_full' : 'modal'}>
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
            className='modal__title'>
                {/* <div 
                    className='cross' 
                    onClick={() => {
                        setIsModal(false);
                        setIsOpacity(false);
                    }}
                ><span></span><span></span></div>  */}
            Меню</div>
            <div className='modal__scroll'>
                <div className='modal__hrefs'>
                    {productsTabsNames.map((productTab, i) => (
                        <a 
                            className={activeTab == productTab.id ? 'modal__href active' : 'modal__href'}
                            onClick={() => {
                                setIsModal(false);
                                setIsOpacity(false);
                                if(setActiveTab) setActiveTab(productTab.id);
                            }} 
                            href={`#${productTab.id}`} 
                            key={productTab.id}
                        >{productTab.name}</a>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default ModalNavBar;