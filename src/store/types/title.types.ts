import { BaseAction, Concat } from './index';
import {
  DELETE_TITLE,
  GET_TITLE_LIST,
  GET_ONE_TITLE,
  POST_NEW_TITLE,
  PUT_TITLE,
  SUCCESS,
  FAIL,
} from '../actionTypes';

export type Title = {
  userTitleId: number,
  userTitleCode: string,
  title: string,
  users: any[],
};

export interface TTitleTable
  extends Required<Pick<Title, 'title' | 'userTitleCode' | 'userTitleId'>> {}

export type TCreateTitle = {
  userTitleCode: string,
  title: string
};

export type TUpdateTitle = TCreateTitle & Pick<Title, 'userTitleId'>;


export interface TitleState {
  titleList: Title[] | [];
  currentTitle: Title | null;
  loadingTitle: boolean;
}

export interface GetTitleList extends BaseAction<typeof GET_TITLE_LIST> {}
export interface GetTitleListSuccess
  extends BaseAction<Concat<typeof GET_TITLE_LIST, typeof SUCCESS>> {
  response: {
    resultStatus: boolean;
    resultObject: Title[];
  };
}

export interface GetOneTitle extends BaseAction<typeof GET_ONE_TITLE> {}
export interface GetOneTitleSuccess
  extends BaseAction<Concat<typeof GET_ONE_TITLE, typeof SUCCESS>> {
  response: {
    resultStatus: boolean;
    resultObject: Title;
  };
}

export interface PostNewTitle extends BaseAction<typeof POST_NEW_TITLE> {}
export interface PostNewTitleSuccess
  extends BaseAction<Concat<typeof POST_NEW_TITLE, typeof SUCCESS>> {
  response: {
    resultObject: Title;
  };
}
export interface PostNewTitleFail
  extends BaseAction<Concat<typeof POST_NEW_TITLE, typeof FAIL>> {}

export interface UpdateTitle extends BaseAction<typeof PUT_TITLE> {}
export interface UpdateTitleSuccess
  extends BaseAction<Concat<typeof PUT_TITLE, typeof SUCCESS>> {
  response: {
    resultObject: Title;
  };
}

export interface DeleteTitle extends BaseAction<typeof DELETE_TITLE> {}
export interface DeleteTitleSuccess
  extends BaseAction<Concat<typeof DELETE_TITLE, typeof SUCCESS>> {
  response: {
    resultStatus: boolean;
    languageKeyword: string;
    resultObject: [];
  };
}

export type TitleActions =
  | GetTitleList
  | GetTitleListSuccess
  | GetOneTitle
  | GetOneTitleSuccess
  | PostNewTitle
  | PostNewTitleSuccess
  | PostNewTitleFail
  | UpdateTitle
  | UpdateTitleSuccess
  | DeleteTitle
  | DeleteTitleSuccess;
