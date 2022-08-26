import React from 'react';
import { NavLink } from 'react-router-dom';
import { navBarProps } from './NavBar';

const ModalNavBar: React.FC<navBarProps> = ({productsTabsNames, reference, opacityRef}) => {
    return (
        <div ref={reference} className='modal'>
            <div className='modal__title'>
                <div 
                    className='cross' 
                    onClick={() => {
                        reference.current.style.bottom = '-100%';
                        opacityRef.current.style.opacity = '0';
                    }}
                ><span></span><span></span></div> 
            Меню</div>
            <div className='modal__hrefs'>
                {productsTabsNames.map((productTab, i) => (
                    <NavLink 
                        className='modal__href' 
                        onClick={() => {
                            reference.current.style.bottom = '-100%';
                            opacityRef.current.style.opacity = '0';
                        }} 
                        to={i === 0 ? `/` : `/${productTab.id}`} 
                        key={productTab.id}
                    >{productTab.name}</NavLink>
                ))}
            </div>
        </div>
    );
};

export default ModalNavBar;