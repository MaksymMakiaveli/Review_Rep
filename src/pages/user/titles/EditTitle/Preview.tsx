import React from 'react';
import { HeaderEditAction, InputContainer, PreviewField } from '@components';
import { ModalDelete } from '@UiKitComponents';
import { Title } from '@Types/title.types';
import { useToggle } from '@hooks';
import { deleteTitle } from '@Actions/title.action';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import HeaderEditActionProps from '@TypeComponents/HeaderEditAction/HeaderEditAction.type';

interface PreviewProps extends Pick<HeaderEditActionProps, 'openEditPage'> {
  currentTitle: Title;
}

const Preview: React.FC<PreviewProps> = (props) => {
  const { currentTitle, openEditPage } = props;
  const [openModal, setOpenModal] = useToggle();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const deleteTitles = () => {
    if (currentTitle) {
      dispatch(deleteTitle([currentTitle.userTitleId]));
    }
    setOpenModal(!open);
    navigate('/Titles');
  };
  return (
    <>
      <HeaderEditAction
        title={currentTitle.title}
        openEditPage={openEditPage}
        openDeleteModal={setOpenModal}
      />
      <div className="form_box">
        <InputContainer>
          <PreviewField label="Title Code" description={currentTitle.userTitleCode} />
          <PreviewField label="Title" description={currentTitle.title} />
        </InputContainer>
      </div>
      <ModalDelete
        title="title"
        body="the title"
        name={currentTitle.title}
        open={openModal}
        setOpen={setOpenModal}
        onDelete={deleteTitles}
      />
    </>
  );
};
export default Preview;
