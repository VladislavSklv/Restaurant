import React from 'react';
import { IProductsTab } from '../API/vendorAPI';
import Product from './Product';

interface productListProps {
    productsTabs: IProductsTab[];
    setActiveTab: React.Dispatch<React.SetStateAction<string>>;
    setIsDetails: React.Dispatch<React.SetStateAction<boolean>>;
    setDetailsId: React.Dispatch<React.SetStateAction<number>>;
    setIsOpacity: React.Dispatch<React.SetStateAction<boolean>>;
    myId: number;
    setMyId: React.Dispatch<React.SetStateAction<number>>;
}

const ProductsList:React.FC<productListProps> = ({productsTabs, setActiveTab, setDetailsId, setIsDetails, setIsOpacity, myId, setMyId}) => {
    return (
        <>
            {productsTabs !== undefined && productsTabs.map(productsTab => (
                <div 
                    onTouchMove={() => setActiveTab(productsTab.id)} 
                    onTouchStart={() => setActiveTab(productsTab.id)} 
                    onTouchEnd={() => setActiveTab(productsTab.id)} 
                    className='pt-54px' 
                    key={productsTab.id} 
                    id={productsTab.id}
                >
                    <div className='title'>{productsTab.name}</div>
                    <div className='menu__wrapper'>
                        {productsTab.products.map(product => (
                            <Product myId={myId} setMyId={setMyId} key={product.id} setIsOpacity={setIsOpacity} setDetailsId={setDetailsId} setIsDetails={setIsDetails} product={product} />
                        ))}
                    </div>
                </div>
            ))}   
        </>
    );
};

export default ProductsList;