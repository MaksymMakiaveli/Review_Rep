import { concatActions } from '@helpers/functions';
import { AxiosError, AxiosResponse } from 'axios';
import { Dispatch, Middleware } from 'redux';

import axios from '../../config/axios';
import customHistory from '../../config/history';
import { ActionsTypes } from '../actions';
import { FAIL, SUCCESS } from '../actionTypes';

const api: Middleware = () => (next: Dispatch) => (action: ActionsTypes) => {
  const { type } = action;
  if (!action.api) {
    return next(action);
  }
  next(action);
  return axios
    .request({
      ...action.api,
      params: {
        ...action.api.params,
      },
    })
    .then((response: AxiosResponse) => {
      next({
        ...action,
        type: concatActions(type, SUCCESS),
        response: response.data,
      });
      if (action.redirect) {
        customHistory.replace(action.redirect.path);
      }
    })
    .catch((error: AxiosError) => {
      next({ ...action, type: concatActions(type, FAIL), response: error.response?.data });
    });
};

export default api;
