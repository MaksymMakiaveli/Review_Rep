import React, { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useToggle } from '@hooks';
import { RootState } from '@RootStateType';
import { getOneContract } from '@Actions/contracts.action';
import { Loader } from '@common';
import { HeaderEditAction, ModalDelete } from '@components';
import PreviewContract from '@pages/properties/contracts/EditContract/Preview';

type ContractParams = {
  ContractID: string;
};

interface EditContractProps {}

const getContractState = (state: RootState) => state.ContractReducer;

const EditContract: React.FC<EditContractProps> = () => {
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
        {modeEdit ? <PreviewContract currentContract={currentContract} /> : null}
        <ModalDelete
          title="Contract"
          body="the contract"
          name={currentContract.name}
          open={openModal}
          setOpen={setOpenModal}
          onDelete={deleteContract}
        />
      </div>
    </div>
  );
};

export default EditContract;
