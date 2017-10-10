import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Board from './components/Board';
import configureStore from "./redux/store";
import { Provider } from "react-redux";
import registerServiceWorker from './registerServiceWorker';

let store = configureStore();

ReactDOM.render(
  <Provider store={store}>
    <Board />
  </Provider>,
  document.getElementById('root')
);
registerServiceWorker();
