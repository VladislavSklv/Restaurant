import React, { useEffect, useState } from 'react';
import { BrowserRouter, Route, Routes, useNavigate } from 'react-router-dom';
import {  useGetProductsMenuQuery } from './API/vendorAPI';
import ErrorBlock from './components/ErrorBlock';
import Loader from './components/Loader';
import { useAppSelector } from './hooks/hooks';
import CartPage from './pages/CartPage';
import MainMenuPage from './pages/MainMenuPage';
import ProductDetailsPage from './pages/ProductDetailsPage';
import { IfinalProduct } from './redux/productSlice';

function App() {
	const productProps = {vendorId: 81225};
	const {data: products, isLoading, isError} = useGetProductsMenuQuery(productProps);
	const [totalPrice, setTotalPrice] = useState(0);

	const {products: finalProducts} = useAppSelector(state => state.product);

	useEffect(() => {
		if(finalProducts !== undefined && finalProducts.length > 0) {
			let price: number = 0;
			let allProductsStringify: string[]  = [];
			let allProducts: IfinalProduct[] = [];
			finalProducts.forEach(product => {
				if(!allProductsStringify.includes(JSON.stringify(product))) allProductsStringify.push(JSON.stringify(product));
			});
			allProductsStringify.forEach(product => allProducts.push(JSON.parse(product)));
			allProducts.forEach(product => {
				let thisPrice = product.price
				if(product.ingredients !== undefined && product.ingredients.length > 0) product.ingredients.forEach(ingredient => thisPrice += ingredient.price);
				thisPrice *= product.quantity;
				price += thisPrice;
			});
			setTotalPrice(price);
		} else setTotalPrice(0);
	}, [finalProducts]);

	return (
		<BrowserRouter>
			<Routes>
				{products !== undefined && <Route path='/' element={<MainMenuPage vendorId={productProps.vendorId} totalPrice={totalPrice} setTotalPrice={setTotalPrice} productsTabs={products} />} />}
				{isLoading && <Route path='/' element={<Loader/>} />}
				{isError && <Route path='/' element={<ErrorBlock/>} />}
				<Route path='/cart' element={<CartPage totalPrice={totalPrice} vendorId={productProps.vendorId} />}/>
			</Routes>
		</BrowserRouter>
	);
}

export default App;
