import React from 'react';
import classes from '../Contract.module.scss';
import { Contract } from '@Types/contract.types';
import { InputContainer, PreviewField } from '@components';
import cl from "classnames";

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
    <div className={cl("form_box", classes.form_box_help)}>
      <InputContainer title="Summary">
        <PreviewField label="Contract Code" description={updateValuesContract.contractCode} />
        <PreviewField label="Contract Name" description={updateValuesContract.name} />
        <PreviewField label="Contract No" description={updateValuesContract.no} />
        <div className={classes.group_preview_price}>
          <PreviewField label="Agreement Price" description={updateValuesContract.price} />
          <PreviewField label="" description={updateValuesContract.currencyName} />
        </div>
      </InputContainer>
      <InputContainer>
        <PreviewField label="Vendor" description={updateValuesContract.partner.name} />
        <div className={classes.group_preview}>
          <PreviewField label="startDate" description={updateValuesContract.startDate} />
          <PreviewField label="endDate" description={updateValuesContract.endDate} />
        </div>
        <PreviewField label='Description' description={'asd askfjsdfj ksad jfkj dsakfj sakdjf ksadjf kasd kfjsdkaj fksdaj kfjsd kfjsdak fdkf  fdkdjsfk fdasfdasf df sadf  fsdaf fsdaf sdaf sadf'} variant='textField'/>
      </InputContainer>
    </div>
  );
};

export default PreviewContract;
