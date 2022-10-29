import React, {useState, useEffect} from 'react';
import { useSwipeable } from 'react-swipeable';
import { disablePageScroll, enablePageScroll } from 'scroll-lock';
import { mainArray } from '../API/vendorAPI';

export interface modalNavBarProps {
    productsTabs: mainArray[];
    setIsOpacity: React.Dispatch<React.SetStateAction<boolean>>;
    setIsModal: React.Dispatch<React.SetStateAction<boolean>>;
    isModal: boolean;
    mainMenuRef: React.RefObject<HTMLDivElement>;
    activeTab?: string;
    setActiveTab?: React.Dispatch<React.SetStateAction<string>>;
}

export interface productsTabs {
	name: string;
	id: string;
}

const ModalNavBar: React.FC<modalNavBarProps> = ({productsTabs, setIsModal, setIsOpacity, isModal, activeTab, mainMenuRef}) => {
    const [isScrolledTop, setIsScrolledTop] = useState(true);
    const [isSwiped, setIsSwiped] = useState(true);

    /* Swipe Handlers */
    const handlers = useSwipeable({
        onSwipedDown: () =>{
            if(isScrolledTop){
                setIsSwiped(true);
                if(isSwiped){
                    setIsModal(false);
                    setIsOpacity(false);
                }
            }
        }
    })

    return (
        <div 
            {...handlers} 
            style={isModal ? {'bottom': '0'} : {'bottom': '-100%'} } 
            className='modal-navbar'
            onScroll={(e: any) => {
                if(e.target.scrollTop === 0) {
                    setIsScrolledTop(true);
                }
                else {
                    setIsScrolledTop(false);
                    setIsSwiped(false);
                };
            }}
            data-scroll-lock-scrollable
        >
            <div className='modal-navbar__title'>Меню</div>
            <div className='modal-navbar__scroll'>
                <div className='modal-navbar__hrefs'>
                    {productsTabs.map((productTab, i) => (
                        <a 
                            data-href={productTab.id}
                            className={activeTab == productTab.id.toString() ? 'modal-navbar__href active' : 'modal-navbar__href'}
                            onClick={(e: any) => {
                                setIsModal(false);
                                setIsOpacity(false);
                                if(mainMenuRef.current !== null) {
                                    mainMenuRef.current.childNodes.forEach((div: any) => {
                                        if(div.id && div.id === e.target.dataset.href){
                                            window.scrollBy(0, div.getBoundingClientRect().top);
                                        }
                                    })
                                }
                            }} 
                            key={productTab.id}
                        >{productTab.name} <span>{productTab.products.length}</span></a>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default ModalNavBar;