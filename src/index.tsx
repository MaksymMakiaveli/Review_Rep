import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { Provider } from 'react-redux';
import store from './store';

import 'rsuite/dist/rsuite.min.css';
import 'semantic-ui-css/semantic.min.css';
import './styles/global.scss';

import { CustomRouter } from '@components';
import customHistory from './config/history';

ReactDOM.render(
  <Provider store={store}>
    <CustomRouter history={customHistory}>
      <App />
    </CustomRouter>
  </Provider>,
  document.getElementById('root')
);
