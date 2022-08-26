import React, { useEffect, useRef, useState } from 'react';
import { IProductsTab } from '../API/vendorAPI';
import { productsTabs } from '../App';
import ModalNavBar from '../components/ModalNavBar';
import NavBar from '../components/NavBar';
import Product from '../components/Product';

interface mainMenuPageProps {
    productsTab: IProductsTab;
    productsTabsNames: productsTabs[];
    totalPrice: number;
    setTotalPrice: React.Dispatch<React.SetStateAction<number>>;
}

const MainMenuPage:React.FC<mainMenuPageProps> = ({productsTab, productsTabsNames, totalPrice, setTotalPrice}) => {
    const ref = useRef<HTMLDivElement>();
    const opacityRef = useRef<HTMLDivElement | any>();

    const tg = Telegram.WebApp;

    useEffect(() => {
        if(totalPrice !== 0) {
            tg.MainButton.setParams({'color': '#4986CC', 'is_visible': true, 'text_color': '#ffffff', 'text': 'Перейти к оформлению заказа'})
        } else {
            tg.MainButton.isVisible = false;
        }
    }, [totalPrice]);

    return (
        <div>
            <NavBar opacityRef={opacityRef} reference={ref} productsTabsNames={productsTabsNames} ></NavBar>
            <div className='mainMenu'>
                <div className='title'>{productsTab.name}</div>
                <div className='menu__wrapper'>
                    {productsTab.products.map(product => (
                        <Product key={product.id} setTotalPrice={setTotalPrice} product={product} />
                    ))}
                </div>
                <div ref={opacityRef} className='opacity-block'></div>
                <ModalNavBar opacityRef={opacityRef} reference={ref} productsTabsNames={productsTabsNames}/>
            </div>
        </div>
    );
};

export default MainMenuPage;