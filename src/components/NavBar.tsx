import React from 'react';
import { NavLink } from 'react-router-dom';
import { productsTabs } from '../App';

interface navBarProps {
    productsTabsNames: productsTabs[];
}

const NavBar:React.FC<navBarProps> = ({productsTabsNames}) => {
    return (
        <div className='navbar'>
            {productsTabsNames.map(productTab => (
                <NavLink to={`/${productTab.id}`} className='navbar__href' key={productTab.id}>{productTab.name}</NavLink>
            ))}
        </div>
    );
};

export default NavBar;