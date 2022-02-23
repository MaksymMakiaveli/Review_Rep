import React from 'react';
import { InputContainer, PreviewField, HeaderEditAction } from '@components';
import { ModalDelete } from '@UiKitComponents';
import { Department } from '@Types/department.types';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useToggle } from '@hooks';
import { deleteDepartment } from '@Actions/department.action';
import HeaderEditActionProps from '@TypeComponents/HeaderEditAction/HeaderEditAction.type';

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
      dispatch(deleteDepartment([currentDepartment.departmentId]));
    }
    setOpenModal(!open);
    navigate('/Departments');
  };
  
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
        <PreviewField
          label="Parent Department"
          description={''}
        />
        <PreviewField
          label="Department code"
          description={currentDepartment.departmentCode}
        />
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