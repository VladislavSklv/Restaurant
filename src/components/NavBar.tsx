import React, {useEffect, useRef, createRef} from 'react';
import { productsTabs } from './ModalNavBar';
import { CapsuleTabs } from 'antd-mobile';
export interface navBarProps {
    productsTabsNames: productsTabs[];
    isHamburger: boolean;
    setIsOpacity?: React.Dispatch<React.SetStateAction<boolean>>;
    setIsModal?: React.Dispatch<React.SetStateAction<boolean>>;
    activeTab?: string;
    setActiveTab?: React.Dispatch<React.SetStateAction<string>>;
}

const NavBar:React.FC<navBarProps> = ({productsTabsNames, setIsModal, setIsOpacity, isHamburger, activeTab, setActiveTab}) => {
    const tabRef = createRef<HTMLDivElement>();

    useEffect(() => {
        tabRef.current?.childNodes.forEach((tab: any) => {
            if(tab.classList.contains('active')) {
                tab.scrollIntoView({block: "end", inline: "nearest"});
            }
        });
    }, [activeTab]);

    /* 
    <a 
        href={`#${productTab.id}`} 
        key={productTab.id}
        className={activeTab == productTab.id ? 'navbar__href active' : 'navbar__href'} 
        onClick={() => {
            if(setActiveTab) setActiveTab(productTab.id);
        }}
    >{productTab.name}</a>
    */


    /* 
    <a
        href={`#${productTab.id}`} 
        key={productTab.id}
        onClick={() => {
            if(setActiveTab) setActiveTab(productTab.id);
        }}
        >
        <CapsuleTabs.Tab key={productTab.id} title={productTab.name}/>
    </a>
*/

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
                        href={`#${productTab.id}`} 
                        key={productTab.id}
                        className={activeTab == productTab.id ? 'navbar__href active' : 'navbar__href'} 
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