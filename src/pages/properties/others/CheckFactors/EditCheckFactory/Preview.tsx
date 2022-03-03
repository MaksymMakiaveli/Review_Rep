import React from 'react';

import { deleteCheckFactoryById } from '@Actions/checkFactors.action';
import { HeaderEditAction, InputContainer, PreviewField } from '@components';
import { useToggle } from '@hooks';
import HeaderEditActionProps from '@TypeComponents/HeaderEditAction/HeaderEditAction.type';
import { CheckFactory } from '@Types/checkFactors.type';
import { ModalDelete } from '@UiKitComponents';
import { useDispatch } from 'react-redux';

interface PreviewProps extends Pick<HeaderEditActionProps, 'openEditPage'> {
  currentCheckFactory: CheckFactory;
}

const Preview = (props: PreviewProps) => {
  const { currentCheckFactory, openEditPage } = props;
  const dispatch = useDispatch();
  const [openModal, setOpenModal] = useToggle();

  const deleteCheckFactory = () => {
    if (currentCheckFactory) {
      const checkFactorId = {
        checkFactorIds: [currentCheckFactory.checkFactorId],
      };

      dispatch(deleteCheckFactoryById(checkFactorId));
    }
    setOpenModal(!openModal);
  };

  return (
    <>
      <HeaderEditAction
        title={currentCheckFactory.name}
        openEditPage={openEditPage}
        openDeleteModal={setOpenModal}
      />
      <div className="form_box">
        <InputContainer>
          <PreviewField label="Check Factor Code" description={currentCheckFactory.checkFactorId} />
          <PreviewField label="Check Factor Reason" description={currentCheckFactory.name} />
          <PreviewField label="Description" description={currentCheckFactory.description} />
        </InputContainer>
      </div>
      <ModalDelete
        title="Check Factory"
        body="the Check Factory"
        name={currentCheckFactory.name}
        open={openModal}
        setOpen={setOpenModal}
        onDelete={deleteCheckFactory}
      />
    </>
  );
};

export default Preview;
