import React, { useEffect } from 'react';

import { getOneCostCenter } from '@Actions/costCenter.action';
import { Loader } from '@common';
import { useBackHistory, useToggle } from '@hooks';
import { RootState } from '@RootStateType';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

import Edit from './Edit';
import Preview from './Preview';

type CostCenterParams = {
  costCenterId: string;
};

interface EditCostCenterProps {}

const getCostCenterState = (state: RootState) => state.CostCenterReducer;

const EditCostCenter: React.FC<EditCostCenterProps> = () => {
  const back = useBackHistory();
  const params = useParams<CostCenterParams>();
  const dispatch = useDispatch();
  const [modeEdit, setModeEdit] = useToggle();
  const { loadingCostCenter, currentCostCenter } = useSelector(getCostCenterState);
  const costCenterId = params.costCenterId ? params.costCenterId : '';

  useEffect(() => {
    dispatch(getOneCostCenter(costCenterId));
  }, []);

  if (loadingCostCenter || !currentCostCenter) {
    return <Loader />;
  }

  return (
    <div>
      {!modeEdit ? (
        <span onClick={back} className="preview_back_link">
          Back
        </span>
      ) : null}
      <div className="padding_wrapper_page">
        {modeEdit ? (
          <Edit currentCostCenter={currentCostCenter} backToPreview={setModeEdit} />
        ) : (
          <Preview currentCostCenter={currentCostCenter} openEditPage={setModeEdit} />
        )}
      </div>
    </div>
  );
};

export default EditCostCenter;
