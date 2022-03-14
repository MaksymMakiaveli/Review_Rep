import { concatActions, returnLanguageKeyword } from '@helpers/functions';
import { AxiosError, AxiosResponse } from 'axios';
import { Dispatch, Middleware } from 'redux';

import axios from 'axios';
import axiosConfig from '../../config/axios';
import customHistory from '../../config/history';
import { ActionsTypes } from '../actions';
import { FAIL, SUCCESS } from '../actionTypes';
import { toast } from 'react-toastify';
import { ResponseAsetlyApi } from '@Types/index';

const api: Middleware = () => (next: Dispatch) => (action: ActionsTypes) => {
  const { type } = action;
  if (!action.api) {
    return next(action);
  }
  next(action);
  return axiosConfig
    .request({
      ...action.api,
      params: {
        ...action.api.params,
      },
    })
    .then((response: AxiosResponse<ResponseAsetlyApi<any>, any>) => {
      if (!response.data.resultStatus) {
        const languageKeyword = returnLanguageKeyword(response.data.languageKeyword);
        throw new Error(languageKeyword);
      }
      next({
        ...action,
        type: concatActions(type, SUCCESS),
        response: response.data,
      });
      if (action.redirect) {
        customHistory.replace(action.redirect.path);
      }
      if (action.showToaster) {
        const { description, type } = action.showToaster;
        switch (type) {
          case 'success':
            return toast.success(description);
          case 'error':
            return toast.error(description);
          case 'warn':
            return toast.warn(description);
          case 'info':
            return toast.info(description);
        }
      }
    })
    .catch((error: AxiosError | Error) => {
      if (axios.isAxiosError(error)) {
        next({ ...action, type: concatActions(type, FAIL), response: error.response?.data });
      } else {
        toast.error(error.message);
        next({ ...action, type: concatActions(type, FAIL), response: error.message });
      }
    });
};

export default api;
