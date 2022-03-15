import { SiteActions, TCreateSite, TUpdateSite } from '@Types/site.types';

import {
  DELETE_SITE,
  GET_SITE_LIST,
  GET_ONE_SITE,
  POST_NEW_SITE,
  UPDATE_SITE,
} from '../actionTypes';

export const GetSiteList = (): SiteActions => ({
  type: GET_SITE_LIST,
  api: {
    url: '/Sites/GetSitesList',
    method: 'GET',
  },
});

export const GetOneSite = (id: string | number): SiteActions => ({
  type: GET_ONE_SITE,
  api: {
    url: `/Sites/GetSitesById/${id}`,
    method: 'GET',
  },
});

export const postNewSite = (newSite: TCreateSite): SiteActions => ({
  type: POST_NEW_SITE,

  api: {
    url: '/Sites/AddSite',
    method: 'POST',
    data: {
      ...newSite,
    },
  },
  redirect: {
    path: `/Sites`,
  },
  showToaster: {
    type: 'success',
    description: `${newSite.name} is created`,
  },
});

export const updateSite = (site: TUpdateSite, backToPreview: () => void): SiteActions => ({
  type: UPDATE_SITE,
  api: {
    url: '/Sites/UpdateSite',
    method: 'POST',
    data: {
      ...site,
    },
  },
  functions: [backToPreview],
  showToaster: {
    type: 'success',
    description: `${site.name} is updated`,
  },
});

export const deleteSite = (siteIds: number[]): SiteActions => ({
  type: DELETE_SITE,
  api: {
    url: `/Sites/RemoveByIdList`,
    method: 'POST',
    data: {
      SiteIds: siteIds,
    },
  },
});
