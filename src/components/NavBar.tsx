import React from 'react';
import { NavLink } from 'react-router-dom';
import { productsTabs } from '../App';

export interface navBarProps {
    productsTabsNames: productsTabs[];
    reference: React.MutableRefObject<HTMLDivElement> | any;
    opacityRef: React.MutableRefObject<HTMLDivElement> | any;
}

const NavBar:React.FC<navBarProps> = ({productsTabsNames, reference, opacityRef}) => {
    return (
        <div className='navbar'>
            <div 
                className='hamburger'
                onClick={() => {    
                    reference.current.style.bottom = '0px';
                    opacityRef.current.style.opacity = '0.54';
                }}
            >
                <span className='hamburger__block'></span>
                <span className='hamburger__block'></span>
                <span className='hamburger__block'></span>
            </div>
            <div className='navbar__wrapper'>
                {productsTabsNames.map((productTab, i) => (
                    i === 0 
                    ? <NavLink to={`/`} className='navbar__href' key={productTab.id}>{productTab.name}</NavLink>
                    : <NavLink to={`/${productTab.id}`} className='navbar__href' key={productTab.id}>{productTab.name}</NavLink>
                ))}
            </div>
        </div>
    );
};

export default NavBar;