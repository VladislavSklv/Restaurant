import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { vendorApi } from './API/vendorAPI';
import productSlice from './redux/productSlice';

const root = ReactDOM.createRoot(
	document.getElementById('root') as HTMLElement
);

const rootReducer = combineReducers({
	[vendorApi.reducerPath]: vendorApi.reducer,
	product: productSlice
});

const store = configureStore({
	reducer: rootReducer,
});

window.Telegram.WebApp.expand();

console.log(window.Telegram.WebApp.version);

root.render(
	<Provider store={store}>
		<BrowserRouter>
			<App/>
		</BrowserRouter>
	</Provider>
);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;