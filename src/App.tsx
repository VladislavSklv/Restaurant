import React, { useState } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { useGetProductsMenuQuery } from './API/vendorAPI';
import MainMenuPage from './pages/MainMenuPage';
import ProductDetailsPage from './pages/ProductDetailsPage';

export interface productsTabs {
	name: string;
	id: string;
}

function App() {
	const productProps = {vendorId: 81225};
	const {data: products, isLoading, isError} = useGetProductsMenuQuery(productProps);
	const [totalPrice, setTotalPrice] = useState(0);
	
	let productsTabsNames: productsTabs[] = [];
	products?.map(productTab => {
		productsTabsNames.push({name: productTab.name, id: productTab.id});
	});

	return (
		<BrowserRouter>
			<Routes>
				{products !== undefined && 
					products.map((product, i) => (
						<Route path={i === 0 ? `/`: `/${product.id}`} key={product.id} element={<MainMenuPage totalPrice={totalPrice} setTotalPrice={setTotalPrice} productsTab={product} productsTabsNames={productsTabsNames} />} />
					))}
				<Route path='/details/:id/:numberOf' element={<ProductDetailsPage vendorId={productProps.vendorId}/>}/>
			</Routes>
		</BrowserRouter>
	);
}

export default App;
