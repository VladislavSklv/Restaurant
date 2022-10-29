import React, {useEffect, useRef, createRef} from 'react';
import { productsTabs } from './ModalNavBar';
export interface navBarProps {
    productsTabsNames: productsTabs[];
    isHamburger: boolean;
    mainMenuRef: React.RefObject<HTMLDivElement>;
    setIsOpacity?: React.Dispatch<React.SetStateAction<boolean>>;
    setIsModal?: React.Dispatch<React.SetStateAction<boolean>>;
    activeTab?: string;
    setActiveTab?: React.Dispatch<React.SetStateAction<string>>;
}

const NavBar:React.FC<navBarProps> = ({productsTabsNames, setIsModal, setIsOpacity, isHamburger, activeTab, setActiveTab, mainMenuRef}) => {
    const tabRef = createRef<HTMLDivElement>();

    useEffect(() => {
        tabRef.current?.childNodes.forEach((tab: any) => {
            if(tab.classList.contains('active')) {
                let left = tab.getBoundingClientRect().left - 46;
                tabRef.current!.scrollBy({
                    left,
                    top: 0,
                    behavior: 'smooth'
                });
            }
        });
    }, [activeTab]);

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
            <div ref={tabRef} className='navbar__wrapper'>
                {productsTabsNames.map(productTab => (
                    <a 
                        data-href={`${productTab.id}`} 
                        key={productTab.id}
                        className={activeTab == productTab.id ? 'navbar__href active' : 'navbar__href'} 
                        onClick={(e: any) => {
                            if(mainMenuRef.current !== null) {
                                mainMenuRef.current.childNodes.forEach((div: any) => {
                                    if(div.id && div.id === e.target.dataset.href){
                                        window.scrollBy(0, div.getBoundingClientRect().top);
                                    }
                                })
                            }
                            /* if(setActiveTab) setActiveTab(productTab.id); */
                        }}
                    >{productTab.name}</a>
                ))}
            </div>
        </div>
    );
};

export default NavBar;