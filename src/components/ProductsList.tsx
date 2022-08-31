import React from 'react';
import { IProductsTab } from '../API/vendorAPI';
import Product from './Product';

interface productListProps {
    productsTabs: IProductsTab[];
    setActiveTab: React.Dispatch<React.SetStateAction<string>>;
}

const ProductsList:React.FC<productListProps> = ({productsTabs, setActiveTab}) => {
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
                            <Product key={product.id} product={product} />
                        ))}
                    </div>
                </div>
            ))}   
        </>
    );
};

export default ProductsList;