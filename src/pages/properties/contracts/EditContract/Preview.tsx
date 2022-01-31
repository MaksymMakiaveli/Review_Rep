import React from 'react';
import classes from '../Contract.module.scss';
import { Contract } from '@Types/contract.types';
import { InputContainer, PreviewField } from '@components';
import { Divider } from '@UiKitComponents';

interface PreviewContractProps {
  currentContract: Contract;
}

const PreviewContract: React.FC<PreviewContractProps> = (props) => {
  const { currentContract } = props;

  return (
    <div className="form_box">
      <div className={classes.form_box_help}>
        <InputContainer title="Summary">
          <PreviewField label="Contract Code" description={currentContract.contractCode} />
          <PreviewField label="Contract Name" description={currentContract.name} />
          <PreviewField label="Contract No" description={currentContract.no} />
          <div className={classes.group_preview_price}>
            <PreviewField label="Agreement Price" description={currentContract.price} />
            <PreviewField label="" description={currentContract.currencyName} />
          </div>
        </InputContainer>
        <InputContainer>
          <PreviewField label="Vendor" description={currentContract.partner.name} />
          <div className={classes.group_preview}>
            <PreviewField label="Contract Start Date" description={currentContract.startDate} />
            <PreviewField label="Contract End Date" description={currentContract.endDate} />
          </div>
          <PreviewField
            label="Description"
            description={currentContract.description}
            variant="textField"
          />
        </InputContainer>
      </div>
      <Divider margin="20px 0 20px 0" />
      <InputContainer title="Documents">{/* That must be files */}</InputContainer>
    </div>
  );
};

export default PreviewContract;
