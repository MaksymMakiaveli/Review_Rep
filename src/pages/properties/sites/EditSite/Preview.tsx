import React from 'react';
import { HeaderEditAction, InputContainer, PreviewField } from '@components';
import { Divider, ModalDelete } from '@UiKitComponents';
import { Site } from '@Types/site.types';
import { useToggle } from '@hooks';
import { deleteSite } from '@Actions/site.action';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import HeaderEditActionProps from '@TypeComponents/HeaderEditAction/HeaderEditAction.type';

interface PreviewProps extends Pick<HeaderEditActionProps, 'openEditPage'> {
  currentSite: Site;
}

const Preview: React.FC<PreviewProps> = (props) => {
  const { currentSite, openEditPage } = props;
  const [openModal, setOpenModal] = useToggle();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const parentSite = currentSite.parentSite ? currentSite.parentSite.name : '';

  const deleteSites = () => {
    if(currentSite) {
      dispatch(deleteSite([currentSite.siteId]));
    }
    setOpenModal(!open);
    navigate('/Locations');
  }

  return (
    <>
      <HeaderEditAction
        title={currentSite.name}
        openEditPage={openEditPage}
        openDeleteModal={setOpenModal}
      />
      <div className="form_box">
        <InputContainer title="Summary" columns={2}>
          <PreviewField 
            label="Site Name" 
            description={currentSite.name} 
          />
          <PreviewField
            label="Site Barcode"
            description={currentSite.barcode}
          />
          <PreviewField
            label="Site Code"
            description={currentSite.siteCode}
          />
          <PreviewField 
            label="Parent site" 
            description={parentSite} 
          />
        </InputContainer>
        <Divider margin="40px 0 20px 0" />
        <div className="markup_helper-box">
          <InputContainer title="Location">
            <PreviewField 
              label="Country" 
              description={currentSite.city.country.name} 
            />
            <PreviewField 
              label="City" 
              description={currentSite.city.name} 
            />
            <PreviewField 
              label="Town" 
              description={currentSite.town} 
            />
            <PreviewField 
              label="Area" 
              description={currentSite.area} 
            />
          </InputContainer>
          <InputContainer>
            <PreviewField 
                label="Address" 
                description={currentSite.address} 
            />
            <PreviewField
              label="Description"
              description={currentSite.description}
              variant="textField"
            />
          </InputContainer>
        </div>
      </div>
      <ModalDelete
        title="site"
        body="the site"
        name={currentSite.name}
        open={openModal}
        setOpen={setOpenModal}
        onDelete={deleteSites}
      />
    </>
  );
};

export default Preview;