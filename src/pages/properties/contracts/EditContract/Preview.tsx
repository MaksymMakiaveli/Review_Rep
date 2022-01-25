import React from 'react';
import { Contract } from '@Types/contract.types';
import { InputContainer, PreviewField } from '@components';

interface PreviewContractProps {
  currentContract: Contract;
}

const PreviewContract: React.FC<PreviewContractProps> = (props) => {
  const { currentContract } = props;

  return (
    <div className="form_box">
      <InputContainer title="Summary">
        <PreviewField label="Contract Code" description={currentContract.contractCode} />
        <PreviewField label="Vendor" description={'partner'} />
        <PreviewField label="Contract Name" description={currentContract.name} />
        <PreviewField label="startDate" description={currentContract.startDate} />
        <PreviewField label="Country" description="null" />
        <PreviewField label="City" description="null" />
      </InputContainer>
    </div>
  );
};

export default PreviewContract;
