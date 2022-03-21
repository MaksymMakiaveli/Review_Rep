import React from 'react';
import { IExitTypes } from '@Types/exitTypes.type';
import { InputContainer, PageHeaderActions, PreviewField } from '@components';
import { removeExitTypeById } from '@Actions/exitTypes.action';
import { useDispatch } from 'react-redux';

interface PreviewExitTypeProps {
  exitType: IExitTypes;
}

const PreviewExitType = (props: PreviewExitTypeProps) => {
  const { exitType } = props;
  const dispatch = useDispatch();

  const deleteAction = () => {
    dispatch(removeExitTypeById([exitType.checkFactorId], exitType.name));
  };

  return (
    <>
      <PageHeaderActions.PreviewAction title={exitType.name} deleteAction={deleteAction} />
      <div className="form_box">
        <InputContainer>
          <PreviewField label="Exit Type code" description={exitType.code} />
          <PreviewField label="Exit Type name" description={exitType.name} />
          <PreviewField
            label="Description"
            description={exitType.description}
            variant="textField"
          />
        </InputContainer>
      </div>
    </>
  );
};

export default PreviewExitType;
