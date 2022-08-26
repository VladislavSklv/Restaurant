import React, { useEffect, useState } from 'react';
import { IProductsTab } from '../API/vendorAPI';
import { productsTabs } from '../App';
import ModalNavBar from '../components/ModalNavBar';
import NavBar from '../components/NavBar';
import ProductsList from '../components/ProductsList';

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

   /*  const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if(entry.isIntersecting) {
                setActiveTab();
            }
        });
    }, {
        threshold: 0.8,
    }); */

    useEffect(() => {
        if(totalPrice !== 0) {
            Telegram.WebApp.MainButton.setParams({'color': '#4986CC', 'is_visible': true, 'text_color': '#ffffff', 'text': `Заказать ${totalPrice} ₽`})
        } else {
            Telegram.WebApp.MainButton.isVisible = false;
        }
    }, [totalPrice]);

    return (
        <div>
            <NavBar setIsModal={setIsModal} setIsOpacity={setIsOpacity} productsTabsNames={productsTabsNames} ></NavBar>
            <div className='mainMenu'>
                <ProductsList productsTabs={productsTabs} setTotalPrice={setTotalPrice} />
            <div style={isOpacity ? {'opacity': '0.54'} : {'opacity' : '0'}} className='opacity-block'></div>
            <ModalNavBar isModal={isModal} setIsModal={setIsModal} setIsOpacity={setIsOpacity} productsTabsNames={productsTabsNames}/>
            </div>
        </div>
    );
};

export default MainMenuPage;