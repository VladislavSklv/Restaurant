import React, { useState, useEffect, useRef } from 'react';
import { disablePageScroll, enablePageScroll } from 'scroll-lock';
import { mainArray } from '../API/vendorAPI';
import ModalNavBar, { productsTabs } from '../components/ModalNavBar';
import NavBar from '../components/NavBar';
import ProductDetails from '../components/ProductDetails';
import ProductsList from '../components/ProductsList';

interface mainMenuPageProps {
    products: mainArray[];
    vendorId: string;
    totalPrice: number;
    isCart: boolean;
    setIsCart: React.Dispatch<React.SetStateAction<boolean>>;
}

const MainMenuPage:React.FC<mainMenuPageProps> = ({products, vendorId, totalPrice, isCart, setIsCart}) => {
    const [isOpacity, setIsOpacity] = useState(false);
    const [isModal, setIsModal] = useState(false);
    const [isDetails, setIsDetails] = useState(false);
    const [detailsId, setDetailsId] = useState(products[0].products[0].id.toString());
    const [activeTab, setActiveTab] = useState(products[0].id.toString());
    const [myId, setMyId] = useState(1);
    const mainMenuRef = useRef<HTMLDivElement>(null);

    let productsTabsNames: productsTabs[] = [];
	products.map(product => {
		productsTabsNames.push({name: product.name, id: product.id.toString()});
	});

    /* Settimg active tabs */
    window.addEventListener('scroll', () => {
        if(!isCart && mainMenuRef.current !== null){
            mainMenuRef.current.childNodes.forEach((productList: any) => {
                let top = productList.getBoundingClientRect().top;
                let bottom = productList.getBoundingClientRect().bottom;
                if(productList.classList.contains('pt-54px') && ((top > window.innerHeight - 170 && top < window.innerHeight - 100) || (bottom > window.innerHeight - 95 && bottom < window.innerHeight - 25))) {
                    setActiveTab(productList.id.toString());
                }
            })
        }
    });

    /* Disable scroll */
    useEffect(() => {
        if(isDetails || isModal) {
            if(window.pageYOffset === 0) window.scrollBy(0, 1);
            disablePageScroll(document.body);
        } else {
            enablePageScroll(document.body);
        }
    }, [isDetails, isModal]);

    /* Setting telegram main button */
    useEffect(() => {
		if(!isDetails){
            if(totalPrice === 0) Telegram.WebApp.MainButton.hide();
		    window.Telegram.WebApp.MainButton.text = `Перейти в корзину ${totalPrice}₽`;
        };
    }, [totalPrice, isDetails]);

    if(totalPrice === 0) Telegram.WebApp.MainButton.hide();
    else Telegram.WebApp.MainButton.show();

    return (
        <div>
            <NavBar mainMenuRef={mainMenuRef} activeTab={activeTab} setActiveTab={setActiveTab} setIsModal={setIsModal} setIsOpacity={setIsOpacity} productsTabsNames={productsTabsNames} isHamburger={true} ></NavBar>
            <div ref={mainMenuRef} className='mainMenu'>
                <ProductsList myId={myId} setMyId={setMyId} setIsOpacity={setIsOpacity} setDetailsId={setDetailsId} setIsDetails={setIsDetails} setActiveTab={setActiveTab} productsTabs={products}/>
                <div onClick={() => {setIsOpacity(false); setIsModal(false); setIsDetails(false)}} style={isOpacity ? {'opacity': '0.35', 'pointerEvents': 'all'} : {'opacity' : '0'}} className='opacity-block'></div>
                <ProductDetails vendorId={vendorId} products={products} isCart={isCart} setIsCart={setIsCart} isDetails={isDetails} detailsId={parseInt(detailsId)} setIsDetails={setIsDetails} setIsOpacity={setIsOpacity} />
                <ModalNavBar mainMenuRef={mainMenuRef} activeTab={activeTab} setActiveTab={setActiveTab} isModal={isModal} setIsModal={setIsModal} setIsOpacity={setIsOpacity} productsTabs={products}/>
            </div>
        </div>
    );
};

export default MainMenuPage;