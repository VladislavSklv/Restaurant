import React, { useState } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { useGetProductsMenuQuery } from './API/vendorAPI';
import CartPage from './pages/CartPage';
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
	
	return (
		<BrowserRouter>
			<Routes>
				{products !== undefined && <Route path='/' element={<MainMenuPage totalPrice={totalPrice} setTotalPrice={setTotalPrice} productsTabs={products} />} />}
				<Route path='/details/:id/:myId' element={<ProductDetailsPage vendorId={productProps.vendorId}/>}/>
				<Route path='/cart' element={<CartPage />}/>
			</Routes>
		</BrowserRouter>
	);
}

export default App;
