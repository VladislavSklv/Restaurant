import React, { useEffect, useState } from 'react';
import { Route, Routes, useNavigate } from 'react-router-dom';
import {  useGetProductsMenuQuery } from './API/vendorAPI';
import ErrorBlock from './components/ErrorBlock';
import Loader from './components/Loader';
import { useAppSelector } from './hooks/hooks';
import CartPage from './pages/CartPage';
import MainMenuPage from './pages/MainMenuPage';
import { IfinalProduct } from './redux/productSlice';

function App() {
	const productProps = {vendorId: 81225};
	const {data: products, isLoading, isError} = useGetProductsMenuQuery(productProps);
	const [totalPrice, setTotalPrice] = useState(0);
	const [isCart, setIsCart] = useState(false);
	const [isCartModal1, setIsCartModal1] = useState(false);
    const [isCartModal2, setIsCartModal2] = useState(false);

	const {products: finalProducts} = useAppSelector(state => state.product);
	const navigate = useNavigate();

	/* counting total price */
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

	/* Setting telegram main button */
	const mainBtn = () => {
		if(isCart === false){
			setIsCart(true);
			navigate('/cart');
		} else {
			if(isCartModal1 === false && isCartModal2 === false){
				setIsCartModal1(true);
			} else if(isCartModal1 === true) {
				setIsCartModal1(false);
				setIsCartModal2(true);
			} else if(isCartModal2 === true){
				setIsCartModal1(false);
				setIsCartModal2(false);
			}
		}
	};

	
	window.Telegram.WebApp.MainButton.color = '#FF6900'
	window.Telegram.WebApp.MainButton.textColor = '#FFFFFF';
	window.Telegram.WebApp.MainButton.show();

	useEffect(() => {
		if(totalPrice === 0) Telegram.WebApp.MainButton.hide();
		window.Telegram.WebApp.MainButton.text = `Перейти в корзину ${totalPrice}`;
    }, [totalPrice]);

	useEffect(() => {
		window.Telegram.WebApp.onEvent('mainButtonClicked', mainBtn);
		return () => {
			window.Telegram.WebApp.offEvent('mainButtonClicked', mainBtn);
		};
	}, [mainBtn]);

	/* Setting Telegram Back Button */
	const backBtn = () => {
		if(isCart){
			navigate('/');
			setIsCart(false);
		} else {
			window.Telegram.WebApp.close();
		}
	};

	window.Telegram.WebApp.BackButton.show();
	useEffect(() => {
		window.Telegram.WebApp.onEvent('backButtonClicked', backBtn);
		return () => {
			window.Telegram.WebApp.offEvent('backButtonClicked', backBtn);
		};
	}, [backBtn]);

	return (
		<Routes>
			{products !== undefined && <Route path='/' element={<MainMenuPage totalPrice={totalPrice} vendorId={productProps.vendorId} productsTabs={products} />} />}
			{isLoading && <Route path='/' element={<Loader/>} />}
			{isError && <Route path='/' element={<ErrorBlock/>} />}
			<Route path='/cart' element={<CartPage isModal1={isCartModal1} isModal2={isCartModal2} setIsModal1={setIsCartModal1} setIsModal2={setIsCartModal2} totalPrice={totalPrice} vendorId={productProps.vendorId} />}/>
		</Routes>
	);
}

export default App;
