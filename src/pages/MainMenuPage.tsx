import React from 'react';
import { ProductsTab } from '../API/vendorAPI';
import { productsTabs } from '../App';
import NavBar from '../components/NavBar';

interface mainMenuPageProps {
    productsTab: ProductsTab;
    productsTabsNames: productsTabs[];
}

const MainMenuPage:React.FC<mainMenuPageProps> = ({productsTab, productsTabsNames}) => {
    return (
        <div>
            <NavBar productsTabsNames={productsTabsNames} ></NavBar>
            <div>{productsTab.name}</div>
        </div>
    );
};

export default MainMenuPage;