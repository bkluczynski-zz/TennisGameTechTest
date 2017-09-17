import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './components/App';
import registerServiceWorker from './registerServiceWorker';
import loggerMiddleware from 'redux-logger'
import thunkMiddleware from 'redux-thunk'
import {BrowserRouter} from 'react-router-dom'
import { createStore, applyMiddleware, compose } from 'redux'
import { Provider } from 'react-redux'
import players from './reducers'


const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose

const store = createStore(
  players,
  composeEnhancers(
    applyMiddleware(
      loggerMiddleware,
      thunkMiddleware
    )
  )
)

console.log(store)


ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter><App
  /></BrowserRouter>
  </Provider>, document.getElementById('root'));
registerServiceWorker();
