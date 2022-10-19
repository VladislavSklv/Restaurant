import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { IProductsTab } from '../API/vendorAPI';
import ModalNavBar, { productsTabs } from '../components/ModalNavBar';
import NavBar from '../components/NavBar';
import ProductDetails from '../components/ProductDetails';
import ProductsList from '../components/ProductsList';

interface mainMenuPageProps {
    productsTabs: IProductsTab[];
    vendorId: number;
}

const MainMenuPage:React.FC<mainMenuPageProps> = ({productsTabs, vendorId}) => {
    const [isOpacity, setIsOpacity] = useState(false);
    const [isModal, setIsModal] = useState(false);
    const [isDetails, setIsDetails] = useState(false);
    const [detailsId, setDetailsId] = useState(parseInt(productsTabs[0].products[0].id));
    const [activeTab, setActiveTab] = useState(productsTabs[0].id);
    const [myId, setMyId] = useState(1);

    const navigate = useNavigate();

    let productsTabsNames: productsTabs[] = [];
	productsTabs.map(productTab => {
		productsTabsNames.push({name: productTab.name, id: productTab.id});
	});

    return (
        <div>
            <NavBar activeTab={activeTab} setActiveTab={setActiveTab} setIsModal={setIsModal} setIsOpacity={setIsOpacity} productsTabsNames={productsTabsNames} isHamburger={true} ></NavBar>
            <div className='mainMenu'>
                <ProductsList myId={myId} setMyId={setMyId} setIsOpacity={setIsOpacity} setDetailsId={setDetailsId} setIsDetails={setIsDetails} setActiveTab={setActiveTab} productsTabs={productsTabs}/>
                <div onClick={() => {setIsOpacity(false); setIsModal(false); setIsDetails(false)}} style={isOpacity ? {'opacity': '0.35', 'pointerEvents': 'all'} : {'opacity' : '0'}} className='opacity-block'></div>
                <ProductDetails isDetails={isDetails} detailsId={detailsId} setIsDetails={setIsDetails} setIsOpacity={setIsOpacity} vendorId={vendorId} />
                <ModalNavBar activeTab={activeTab} setActiveTab={setActiveTab} isModal={isModal} setIsModal={setIsModal} setIsOpacity={setIsOpacity} productsTabs={productsTabs}/>
            </div>
            <button onClick={() => navigate('/cart')}>Cart</button>
        </div>
    );
};

export default MainMenuPage;