import React from 'react';

import { deleteDepartment } from '@Actions/department.action';
import { InputContainer, PreviewField, HeaderEditAction } from '@components';
import { useToggle } from '@hooks';
import HeaderEditActionProps from '@TypeComponents/HeaderEditAction/HeaderEditAction.type';
import { Department } from '@Types/department.types';
import { ModalDelete } from '@UiKitComponents';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

interface PreviewProps extends Pick<HeaderEditActionProps, 'openEditPage'> {
  currentDepartment: Department;
}

const Preview: React.FC<PreviewProps> = (props) => {
  const { currentDepartment, openEditPage } = props;
  const [openModal, setOpenModal] = useToggle();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const siteName = currentDepartment.site ? currentDepartment.site.name : '';

  const deleteDepartments = () => {
    if (currentDepartment) {
      dispatch(deleteDepartment([currentDepartment.departmentId], currentDepartment.name));
    }
    setOpenModal();
    navigate('/Departments');
  };

  console.log(currentDepartment);

  return (
    <>
      <HeaderEditAction
        title={currentDepartment.name}
        openEditPage={openEditPage}
        openDeleteModal={setOpenModal}
      />
      <div className="form_box">
        <InputContainer columns={2}>
          <PreviewField label="Department name" description={currentDepartment.name} />
          <PreviewField label="Parent Department" description={''} />
          <PreviewField label="Department code" description={currentDepartment.departmentCode} />
          <PreviewField label="Location" description={siteName} />
        </InputContainer>
      </div>
      <ModalDelete
        title="department"
        body="the department"
        name={currentDepartment.name}
        open={openModal}
        setOpen={setOpenModal}
        onDelete={deleteDepartments}
      />
    </>
  );
};
export default Preview;
