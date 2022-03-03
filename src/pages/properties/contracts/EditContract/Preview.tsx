import React from 'react';

import { deleteContractById } from '@Actions/contracts.action';
import { HeaderEditAction, InputContainer, PreviewField } from '@components';
import { useToggle } from '@hooks';
import HeaderEditActionProps from '@TypeComponents/HeaderEditAction/HeaderEditAction.type';
import { Contract } from '@Types/contract.types';
import { Divider, ModalDelete } from '@UiKitComponents';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import classes from '../Contract.module.scss';

interface PreviewProps extends Pick<HeaderEditActionProps, 'openEditPage'> {
  currentContract: Contract;
}

const Preview: React.FC<PreviewProps> = (props) => {
  const { currentContract, openEditPage } = props;
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [openModal, setOpenModal] = useToggle();

  const deleteContract = () => {
    if (currentContract) {
      const contractId = {
        contractIds: [currentContract.contractId],
      };
      dispatch(deleteContractById(contractId));
    }
    setOpenModal(!openModal);
    navigate('/Contracts');
  };

  return (
    <>
      <HeaderEditAction
        title={`Contract ${currentContract.no}`}
        openEditPage={openEditPage}
        openDeleteModal={setOpenModal}
      />
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
      <ModalDelete
        title="Contract"
        body="the contract"
        name={`№${currentContract.no}`}
        open={openModal}
        setOpen={setOpenModal}
        onDelete={deleteContract}
      />
    </>
  );
};

export default Preview;
