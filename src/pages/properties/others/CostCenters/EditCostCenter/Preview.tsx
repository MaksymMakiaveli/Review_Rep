import React from 'react';
import { CostCenter } from '@Types/costCenters.type';
import { useToggle } from '@hooks';
import { HeaderEditAction, InputContainer, PreviewField } from '@components';
import HeaderEditActionProps from '@TypeComponents/HeaderEditAction/HeaderEditAction.type';
import { ModalDelete } from '@UiKitComponents';
import { useDispatch } from 'react-redux';
import { deleteCostCenterById } from '@Actions/costCenter.action';
import { useNavigate } from 'react-router-dom';

interface EditProps extends Pick<HeaderEditActionProps, 'openEditPage'> {
  currentCostCenter: CostCenter;
}

const Edit: React.FC<EditProps> = (props) => {
  const { currentCostCenter, openEditPage } = props;
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [openModal, setOpenModal] = useToggle();

  const deleteCostCenter = () => {
    if (currentCostCenter) {
      const costCenterId = {
        costCenterIds: [currentCostCenter.costCenterId],
      };
      dispatch(deleteCostCenterById(costCenterId));
      navigate('/Others/CostCenters');
    }
    setOpenModal(!openModal);
  };

  return (
    <>
      <HeaderEditAction
        title={currentCostCenter.name}
        openEditPage={openEditPage}
        openDeleteModal={setOpenModal}
      />
      <div className="form_box">
        <InputContainer>
          <PreviewField label="Cost Center Code" description={currentCostCenter.costCenterCode} />
          <PreviewField label="Cost Center Name" description={currentCostCenter.name} />
        </InputContainer>
      </div>
      <ModalDelete
        title="Cost Center"
        body="the Cost Center"
        name={currentCostCenter.name}
        open={openModal}
        setOpen={setOpenModal}
        onDelete={deleteCostCenter}
      />
    </>
  );
};

export default Edit;
