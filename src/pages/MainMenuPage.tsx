import React, { useEffect, useRef, useState } from 'react';
import { IProductsTab } from '../API/vendorAPI';
import { productsTabs } from '../App';
import ModalNavBar from '../components/ModalNavBar';
import NavBar from '../components/NavBar';
import ProductsList from '../components/ProductsList';
import CartPage from './CartPage';

interface mainMenuPageProps {
    productsTabs: IProductsTab[];
    totalPrice: number;
    setTotalPrice: React.Dispatch<React.SetStateAction<number>>;
}

const MainMenuPage:React.FC<mainMenuPageProps> = ({productsTabs, totalPrice, setTotalPrice}) => {
    const [isOpacity, setIsOpacity] = useState(false);
    const [isModal, setIsModal] = useState(false);
    const [activeTab, setActiveTab] = useState(productsTabs[0].id);

    let productsTabsNames: productsTabs[] = [];
	productsTabs.map(productTab => {
		productsTabsNames.push({name: productTab.name, id: productTab.id});
	});

    useEffect(() => {
        if(totalPrice !== 0) {
            Telegram.WebApp.MainButton.setParams({'color': '#4986CC', 'is_visible': true, 'text_color': '#ffffff', 'text': `Заказать ${totalPrice} ₽`})
        } else {
            Telegram.WebApp.MainButton.isVisible = false;
        }
    }, [totalPrice]);

    return (
        <div>
            <NavBar activeTab={activeTab} setActiveTab={setActiveTab} setIsModal={setIsModal} setIsOpacity={setIsOpacity} productsTabsNames={productsTabsNames} isHamburger={true} ></NavBar>
            <div className='mainMenu'>
                <ProductsList setActiveTab={setActiveTab} productsTabs={productsTabs} setTotalPrice={setTotalPrice} />
            <div style={isOpacity ? {'opacity': '0.54'} : {'opacity' : '0'}} className='opacity-block'></div>
            <ModalNavBar activeTab={activeTab} setActiveTab={setActiveTab} isModal={isModal} setIsModal={setIsModal} setIsOpacity={setIsOpacity} productsTabsNames={productsTabsNames}/>
            </div>
        </div>
    );
};

export default MainMenuPage;