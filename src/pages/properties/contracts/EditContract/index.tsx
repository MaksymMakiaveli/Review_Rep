import React, { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useToggle } from '@hooks';
import { RootState } from '@RootStateType';
import { getOneContract } from '@Actions/contracts.action';
import { Loader } from '@common';
import { HeaderEditAction, ModalDelete } from '@components';
import PreviewContract from './Preview';
import Edit from './Edit';

type ContractParams = {
  ContractID: string;
};

interface ContractProps {}

const getContractState = (state: RootState) => state.ContractReducer;

const EditContract: React.FC<ContractProps> = () => {
  const params = useParams<ContractParams>();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [modeEdit, setModeEdit] = useToggle();
  const [openModal, setOpenModal] = useToggle();
  const { currentContract, loadingContract } = useSelector(getContractState);
  const contractId = params.ContractID ? params.ContractID : '';

  const deleteContract = () => {
    if (currentContract) {
      console.log('delete contract');
    }
    setOpenModal(!open);
    navigate('/Contract');
  };

  useEffect(() => {
    dispatch(getOneContract(contractId));
  }, []);

  if (loadingContract || !currentContract) {
    return <Loader />;
  }

  const updateCurrentContract = {
    ...currentContract,
    endDate: currentContract.endDate.split('T')[0],
    startDate: currentContract.startDate.split('T')[0],
  };

  return (
    <div>
      <div className="padding_wrapper_page">
        {!modeEdit && (
          <HeaderEditAction
            title={`Contract ${currentContract.no}`}
            onEditButton={setModeEdit}
            onDeleteButton={setOpenModal}
          />
        )}
        {modeEdit ? (
          <Edit currentContract={updateCurrentContract} backToPreview={setModeEdit} />
        ) : (
          <PreviewContract currentContract={updateCurrentContract} />
        )}
        <ModalDelete
          title="Contract"
          body="the contract"
          name={`№${currentContract.no}`}
          open={openModal}
          setOpen={setOpenModal}
          onDelete={deleteContract}
        />
      </div>
    </div>
  );
};

export default EditContract;
