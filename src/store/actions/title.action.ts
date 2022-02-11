import { TitleActions, TCreateTitle, TUpdateTitle } from '@Types/title.types';
import { DELETE_TITLE,
         GET_TITLE_LIST,
         GET_ONE_TITLE, 
         POST_NEW_TITLE, 
         PUT_TITLE } from '../actionTypes';

export const GetTitleList = (): TitleActions => ({
  type: GET_TITLE_LIST,
  api: {
    url: '/UserTitle/GetTitleList',
    method: 'GET',
  },
});

export const GetOneTitle = (id: string | number): TitleActions => ({
  type: GET_ONE_TITLE,
  api: {
    url: `/UserTitle/GetTitleById/${id}`,
    method: 'GET',
  },
});

export const postNewTitle = (newTitle: TCreateTitle): TitleActions => ({
  type: POST_NEW_TITLE,

  api: {
    url: '/UserTitle/AddTitle',
    method: 'POST',
    data: {
      ...newTitle,
    },
  },
});

export const updateTitle = (title: TUpdateTitle): TitleActions => ({
  type: PUT_TITLE,
  api: {
    url: '/UserTitle/UpdateTitle',
    method: 'POST',
    data: {
      ...title,
    },
  },
});

export const deleteTitle = (titleIds: number[]): TitleActions => ({
  type: DELETE_TITLE,
  api: {
    url: `/UserTitle/RemoveByIdList`,
    method: 'POST',
    data: {
      UserTitleIds: titleIds,
    },
  },
});
