import {
  CostCenter,
  CostCenterActions,
  TCreateCostCenter,
  TUpdateCostCenter,
} from '@Types/costCenters.type';
import {
  DELETE_COST_CENTER,
  GET_COST_CENTERS_LIST,
  GET_ONE_COST_CENTER,
  POST_NEW_COST_CENTER,
  SUCCESS,
  UPDATE_COST_CENTER,
} from '../actionTypes';
import { ThunkAction } from 'redux-thunk';
import { RootState } from '@RootStateType';
import axios from '../../config/axios';
import { ResponseAsetlyApi } from '@Types/index';
import { concatActions } from '@helpers/functions';

export const getCostCentersList = (): CostCenterActions => ({
  type: GET_COST_CENTERS_LIST,
  api: {
    url: '/CostCenter/GetCostCenterList',
    method: 'GET',
  },
});

export const postNewCostCenter = (costCenter: TCreateCostCenter): CostCenterActions => ({
  type: POST_NEW_COST_CENTER,
  api: {
    url: '/CostCenter/AddCostCenter',
    method: 'POST',
    data: costCenter,
  },
  redirect: {
    path: '/Others/CostCenters',
  },
});

export const getOneCostCenter = (costCenterId: string): CostCenterActions => ({
  type: GET_ONE_COST_CENTER,
  api: {
    url: `/CostCenter/GetCostCenterById/${costCenterId}`,
    method: 'GET',
  },
});

export const deleteCostCenterById = (costCenterIds: {
  costCenterIds: number[];
}): CostCenterActions => ({
  type: DELETE_COST_CENTER,
  api: {
    url: '/CostCenter/RemoveByIdList',
    method: 'POST',
    data: costCenterIds,
  },
  data: costCenterIds,
});

// export const updateCostCenter = (costCenter: TUpdateCostCenter): CostCenterActions => ({
//   type: UPDATE_COST_CENTER,
//   api: {
//     url: '/CostCenter/UpdateCostCenter',
//     method: 'PUT',
//     data: costCenter,
//   },
// });

export const updateCostCenter =
  (
    costCenter: TUpdateCostCenter,
    backToPreview: () => void
  ): ThunkAction<any, RootState, any, CostCenterActions> =>
  async (dispatch) => {
    try {
      const costCenterId = costCenter.costCenterId;
      dispatch({ type: UPDATE_COST_CENTER });
      const updateCostCenter = await axios.put('/CostCenter/UpdateCostCenter', costCenter);
      const responseUpdated: Required<
        Pick<ResponseAsetlyApi<CostCenter>, 'resultStatus' | 'languageKeyword'>
      > = await updateCostCenter.data;
      if (responseUpdated.resultStatus) {
        const updatedCostCenter = await axios.get(`/CostCenter/GetCostCenterById/${costCenterId}`);
        const response: ResponseAsetlyApi<CostCenter> = await updatedCostCenter.data;
        dispatch({ type: concatActions(UPDATE_COST_CENTER, SUCCESS), response });
        backToPreview();
      }
    } catch (error: any) {
      console.log(error);
    }
  };
