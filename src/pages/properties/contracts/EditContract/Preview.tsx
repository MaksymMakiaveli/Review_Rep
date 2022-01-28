import React from 'react';
import classes from '../Contract.module.scss';
import { Contract } from '@Types/contract.types';
import { InputContainer, PreviewField } from '@components';

interface PreviewContractProps {
  currentContract: Contract;
}

const PreviewContract: React.FC<PreviewContractProps> = (props) => {
  const { currentContract } = props;

  const updateValuesContract = {
    ...currentContract,
    endDate: currentContract.endDate.split('T')[0],
    startDate: currentContract.startDate.split('T')[0],
  };

  return (
    <div className="form_box">
      <InputContainer title="Summary">
        <PreviewField label="Contract Code" description={updateValuesContract.contractCode} />
        <PreviewField label="Vendor" description={updateValuesContract.partner.name} />
        <PreviewField label="Contract Name" description={updateValuesContract.name} />
        <div className={classes.group_preview}>
          <PreviewField label="startDate" description={updateValuesContract.startDate} />
          <PreviewField label="endDate" description={updateValuesContract.endDate} />
        </div>
        <PreviewField label="Contract No" description={updateValuesContract.no} />
        <div className={classes.group_preview_price}>
          <PreviewField label="Agreement Price" description={updateValuesContract.price} />
          <PreviewField label="" description={updateValuesContract.currencyName} />
        </div>
      </InputContainer>
    </div>
  );
};

export default PreviewContract;
