import React, {useState} from 'react';
import { useSwipeable } from 'react-swipeable';
import { mainArray } from '../API/vendorAPI';

export interface modalNavBarProps {
    productsTabs: mainArray[];
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
    const [isScrolledTop, setIsScrolledTop] = useState(true);
    const [isSwiped, setIsSwiped] = useState(false);

    /* Swipe Handlers */
    const handlers = useSwipeable({
        onSwiping: (e) =>{
            if(isScrolledTop && e.dir === "Down"){
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
        >
            <div className='modal-navbar__title'>Меню</div>
            <div className='modal-navbar__scroll'>
                <div className='modal-navbar__hrefs'>
                    {productsTabs.map((productTab, i) => (
                        <a 
                            className={activeTab == productTab.id.toString() ? 'modal-navbar__href active' : 'modal-navbar__href'}
                            onClick={() => {
                                setIsModal(false);
                                setIsOpacity(false);
                                if(setActiveTab) setActiveTab(productTab.id.toString());
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