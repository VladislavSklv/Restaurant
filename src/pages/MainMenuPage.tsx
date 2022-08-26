import React, { useRef } from 'react';
import { ProductsTab } from '../API/vendorAPI';
import { productsTabs } from '../App';
import ModalNavBar from '../components/ModalNavBar';
import NavBar from '../components/NavBar';

interface mainMenuPageProps {
    productsTab: ProductsTab;
    productsTabsNames: productsTabs[];
}

const MainMenuPage:React.FC<mainMenuPageProps> = ({productsTab, productsTabsNames}) => {
    const ref = useRef<HTMLDivElement>();

    return (
        <div>
            <NavBar reference={ref} productsTabsNames={productsTabsNames} ></NavBar>
            <div>{productsTab.name}</div>
            <ModalNavBar reference={ref} productsTabsNames={productsTabsNames}/>
        </div>
    );
};

export default MainMenuPage;