import React from 'react';

import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';

import App from './App';
import store from './store';

import 'react-toastify/dist/ReactToastify.css';
import 'rsuite/dist/rsuite.min.css';
import './styles/global.scss';

import { CustomRouter } from '@components';

import customHistory from './config/history';

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <CustomRouter history={customHistory}>
        <App />
      </CustomRouter>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);
