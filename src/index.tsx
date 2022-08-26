import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { Provider } from 'react-redux';
import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { vendorApi } from './API/vendorAPI';

const root = ReactDOM.createRoot(
	document.getElementById('root') as HTMLElement
);

const rootReducer = combineReducers({
	[vendorApi.reducerPath]: vendorApi.reducer
});

const store = configureStore({
	reducer: rootReducer,
});

root.render(
	<Provider store={store}>
		<App/>
	</Provider>
);
