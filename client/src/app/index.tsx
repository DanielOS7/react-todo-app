import * as React from "react";
import * as ReactDOM from "react-dom";
import './index.css';
import App from './App';
import { createStore, compose, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import  rootReducer from './components/reducers/root.reducer';
import { Provider } from 'react-redux';


const store = createStore(rootReducer, applyMiddleware(thunk));

ReactDOM.render(
    <Provider store={store}>
         <App />
    </Provider>, document.getElementById('root'));