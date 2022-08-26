import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { useGetProductsMenuQuery } from './API/vendorAPI';
import MainMenuPage from './pages/MainMenuPage';

export interface productsTabs {
	name: string;
	id: string;
}

function App() {
	const productProps = {vendorId: 81225};
	const {data: products, isLoading, isError} = useGetProductsMenuQuery(productProps);
	
	let productsTabsNames: productsTabs[] = [];
	products?.map(productTab => {
		productsTabsNames.push({name: productTab.name, id: productTab.id});
	});

	return (
		<BrowserRouter>
			<Routes>
				{products !== undefined && 
					products.map((product, i) => (
						<Route path={i === 0 ? `/`: `/${product.id}`} key={product.id} element={<MainMenuPage productsTab={product} productsTabsNames={productsTabsNames} />} />
					))}
			</Routes>
		</BrowserRouter>
	);
}

export default App;
