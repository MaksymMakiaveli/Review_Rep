import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { useToggle } from '@hooks';

type ContractParams = {
  ContractID: string;
};

interface EditContractProps {}

const EditContract: React.FC<EditContractProps> = () => {
  const params = useParams<ContractParams>();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [modeEdit, setModeEdit] = useToggle();
  const [openModal, setOpenModal] = useToggle();
  console.log(params, dispatch, navigate, modeEdit, setModeEdit, openModal, setOpenModal);

  return <div></div>;
};

export default EditContract;
